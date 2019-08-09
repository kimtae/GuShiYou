package com.vanniktech.emoji;

import android.support.v4.view.PagerAdapter;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;

import com.vanniktech.emoji.listeners.OnEmojiClickedListener;

final class EmojiPagerAdapter extends PagerAdapter {
    private final OnEmojiClickedListener listener;
    private final OnEmojiLongClickedListener longListener;
    private final RecentEmoji recentEmoji;

    EmojiPagerAdapter(final OnEmojiClickedListener listener,
                      final OnEmojiLongClickedListener longListener,
                      final RecentEmoji recentEmoji) {
        this.listener = listener;
        this.longListener = longListener;
        this.recentEmoji = recentEmoji;
    }

    @Override
    public int getCount() {
        return EmojiManager.getInstance().getCategories().length + 1;
    }

    @Override
    public Object instantiateItem(final ViewGroup pager, final int position) {
        final View newView;

        if (position == 0) {
            RecentEmojiGridView recentEmojiGridView = new RecentEmojiGridView(pager.getContext()).init(listener, longListener, recentEmoji);
            FrameLayout parent = new FrameLayout(pager.getContext());
            parent.addView(recentEmojiGridView);
            View emptyView = LayoutInflater.from(pager.getContext()).inflate(R.layout.recent_emoji_empty_view, null);
            parent.addView(emptyView, new FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
            recentEmojiGridView.setEmptyView(emptyView);
            newView = parent;
        } else {
            newView = new EmojiGridView(pager.getContext()).init(listener, longListener, EmojiManager.getInstance().getCategories()[position - 1]);
        }

        pager.addView(newView);

        return newView;
    }

    @Override
    public void destroyItem(final ViewGroup pager, final int position, final Object view) {
        pager.removeView((View) view);
    }

    @Override
    public boolean isViewFromObject(final View view, final Object object) {
        return view.equals(object);
    }

    int numberOfRecentEmojis() {
        return recentEmoji.getRecentEmojis().size();
    }

}
