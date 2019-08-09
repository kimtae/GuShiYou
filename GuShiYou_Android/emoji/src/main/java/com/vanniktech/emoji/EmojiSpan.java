package com.vanniktech.emoji;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Paint;
import android.graphics.drawable.Drawable;
import android.support.annotation.DrawableRes;
import android.support.annotation.NonNull;
import android.support.v7.content.res.AppCompatResources;
import android.text.style.DynamicDrawableSpan;

import static com.vanniktech.emoji.Utils.checkNotNull;

final class EmojiSpan extends DynamicDrawableSpan {
    private final Context context;
    private final int resourceId;
    private final int size;

    private Drawable drawable;

    EmojiSpan(@NonNull final Context context, @DrawableRes final int resourceId, final int size) {
        this.context = context;
        this.resourceId = resourceId;
        this.size = size;
    }

    @Override
    public Drawable getDrawable() {
        if (drawable == null) {
            drawable = checkNotNull(AppCompatResources.getDrawable(context, resourceId), "emoji drawable == null");
            drawable.setBounds(0, 0, size, size);
        }

        return drawable;
    }

    @Override
    public void draw(Canvas canvas, CharSequence text,
                     int start, int end, float x,
                     int top, int y, int bottom, Paint paint) {
        Drawable b = getDrawable();
        canvas.save();
        int transY = ((bottom - top) - b.getBounds().bottom) / 2 + top + Utils.dpToPx(context, 1);
        canvas.translate(x, transY);
        b.draw(canvas);
        canvas.restore();
    }

    @Override
    public int getSize(Paint paint, CharSequence text, int start, int end, Paint.FontMetricsInt fm) {
        int padding = Utils.dpToPx(context, 2); // 表情间距
        return super.getSize(paint, text, start, end, fm) + padding;
    }
}
