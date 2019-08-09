package com.vanniktech.emoji;

import android.app.Activity;
import android.graphics.Bitmap;
import android.graphics.Point;
import android.graphics.drawable.BitmapDrawable;
import android.support.annotation.CheckResult;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.view.Gravity;
import android.view.View;
import android.widget.PopupWindow;

import com.vanniktech.emoji.emoji.Emoji;
import com.vanniktech.emoji.listeners.OnEmojiBackspaceClickListener;
import com.vanniktech.emoji.listeners.OnEmojiClickedListener;
import com.vanniktech.emoji.listeners.OnEmojiPopupDismissListener;
import com.vanniktech.emoji.listeners.OnEmojiPopupShownListener;

import static com.vanniktech.emoji.Utils.checkNotNull;

public final class EmojiPopup {
    final View rootView;
    final Activity context;

    @NonNull
    final RecentEmoji recentEmoji;
    @NonNull
    final EmojiVariantPopup variantPopup;

    final PopupWindow popupWindow;
    final EmojiEditText emojiEditText;

    @Nullable
    OnEmojiPopupShownListener onEmojiPopupShownListener;
    @Nullable
    OnEmojiBackspaceClickListener onEmojiBackspaceClickListener;
    @Nullable
    OnEmojiClickedListener onEmojiClickedListener;
    @Nullable
    OnEmojiPopupDismissListener onEmojiPopupDismissListener;

    EmojiPopup(@NonNull final View rootView, int width, int height, @NonNull final EmojiEditText emojiEditText, @Nullable final RecentEmoji recent) {
        this.context = Utils.asActivity(rootView.getContext());
        this.rootView = rootView.getRootView();
        this.emojiEditText = emojiEditText;
        this.recentEmoji = recent != null ? recent : new RecentEmojiManager(context);

        popupWindow = new PopupWindow(context);

        final OnEmojiLongClickedListener longClickListener = new OnEmojiLongClickedListener() {
            @Override
            public void onEmojiLongClicked(final View view, final Emoji emoji) {
                variantPopup.show(view, emoji);
            }
        };

        final OnEmojiClickedListener clickListener = new OnEmojiClickedListener() {
            @Override
            public void onEmojiClicked(final Emoji emoji) {
                if (onEmojiClickedListener != null) {
                    onEmojiClickedListener.onEmojiClicked(emoji);
                }
                emojiEditText.input(emoji);
                recentEmoji.addEmoji(emoji);

                variantPopup.dismiss();
            }
        };

        variantPopup = new EmojiVariantPopup(this.rootView, clickListener);

        final EmojiView emojiView = new EmojiView(context, clickListener, longClickListener, recentEmoji);

        emojiView.setOnEmojiBackspaceClickListener(new OnEmojiBackspaceClickListener() {
            @Override
            public void onEmojiBackspaceClicked(final View v) {
                if (onEmojiBackspaceClickListener != null) {
                    onEmojiBackspaceClickListener.onEmojiBackspaceClicked(v);
                }
                emojiEditText.backspace();
            }
        });

        popupWindow.setContentView(emojiView);
        popupWindow.setWidth(width);
        popupWindow.setHeight(height);
        popupWindow.setInputMethodMode(PopupWindow.INPUT_METHOD_NOT_NEEDED);
        popupWindow.setBackgroundDrawable(new BitmapDrawable(context.getResources(), (Bitmap) null)); // To avoid borders and overdraw.
        popupWindow.setOnDismissListener(new PopupWindow.OnDismissListener() {
            @Override
            public void onDismiss() {
                if (onEmojiPopupDismissListener != null) {
                    onEmojiPopupDismissListener.onEmojiPopupDismiss();
                }
            }
        });
    }

    public boolean isShowing() {
        return popupWindow.isShowing();
    }

    public void dismiss() {
        popupWindow.dismiss();
        variantPopup.dismiss();
        recentEmoji.persist();
    }

    public void show() {
        final Point desiredLocation = new Point(0, Utils.screenHeight(context) - popupWindow.getHeight());

        popupWindow.showAtLocation(rootView, Gravity.NO_GRAVITY, desiredLocation.x, desiredLocation.y);
        Utils.fixPopupLocation(popupWindow, desiredLocation);

        if (onEmojiPopupShownListener != null) {
            onEmojiPopupShownListener.onEmojiPopupShown();
        }
    }

    public static final class Builder {
        @NonNull
        private final View rootView;
        @Nullable
        private OnEmojiPopupShownListener onEmojiPopupShownListener;
        @Nullable
        private OnEmojiBackspaceClickListener onEmojiBackspaceClickListener;
        @Nullable
        private OnEmojiClickedListener onEmojiClickedListener;
        @Nullable
        private OnEmojiPopupDismissListener onEmojiPopupDismissListener;
        @Nullable
        private RecentEmoji recentEmoji;
        private int height;
        private int width;

        private Builder(final View rootView) {
            this.rootView = checkNotNull(rootView, "The root View can't be null");
        }

        /**
         * @param rootView The root View of your layout.xml which will be used for calculating the height
         *                 of the keyboard.
         * @return builder For building the {@link EmojiPopup}.
         */
        @CheckResult
        public static Builder fromRootView(final View rootView) {
            return new Builder(rootView);
        }

        @CheckResult
        public Builder setOnEmojiClickedListener(@Nullable final OnEmojiClickedListener listener) {
            onEmojiClickedListener = listener;
            return this;
        }

        @CheckResult
        public Builder setOnEmojiPopupShownListener(@Nullable final OnEmojiPopupShownListener listener) {
            onEmojiPopupShownListener = listener;
            return this;
        }

        @CheckResult
        public Builder setOnEmojiPopupDismissListener(@Nullable final OnEmojiPopupDismissListener listener) {
            onEmojiPopupDismissListener = listener;
            return this;
        }

        @CheckResult
        public Builder setOnEmojiBackspaceClickListener(@Nullable final OnEmojiBackspaceClickListener listener) {
            onEmojiBackspaceClickListener = listener;
            return this;
        }

        /**
         * Allows you to pass your own implementation of recent emojis. If not provided the default one
         * {@link RecentEmojiManager} will be used
         *
         * @since 0.2.0
         */
        @CheckResult
        public Builder setRecentEmoji(@Nullable final RecentEmoji recent) {
            recentEmoji = recent;
            return this;
        }

        public Builder setHeight(int height) {
            this.height = height;
            return this;
        }

        public Builder setWidth(int width) {
            this.width = width;
            return this;
        }

        @CheckResult
        public EmojiPopup build(@NonNull final EmojiEditText emojiEditText) {
            EmojiManager.getInstance().verifyInstalled();
            checkNotNull(emojiEditText, "EmojiEditText can't be null");

            final EmojiPopup emojiPopup = new EmojiPopup(rootView, width, height, emojiEditText, recentEmoji);
            emojiPopup.onEmojiClickedListener = onEmojiClickedListener;
            emojiPopup.onEmojiPopupShownListener = onEmojiPopupShownListener;
            emojiPopup.onEmojiPopupDismissListener = onEmojiPopupDismissListener;
            emojiPopup.onEmojiBackspaceClickListener = onEmojiBackspaceClickListener;
            return emojiPopup;
        }
    }

    public int getHeight() {
        return popupWindow.getHeight();
    }

    public void setHeight(int height) {
        popupWindow.setHeight(height);
    }
}
