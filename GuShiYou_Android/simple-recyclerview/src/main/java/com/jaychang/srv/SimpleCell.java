package com.jaychang.srv;

import android.content.Context;
import android.support.annotation.LayoutRes;
import android.support.annotation.NonNull;
import android.view.View;
import android.view.ViewGroup;

public abstract class SimpleCell<T, VH extends SimpleViewHolder> {

    public interface OnClickCellListener<CELL, VH, T> {
        void onClickCell(CELL cell, VH viewHolder, T item);
    }

    public interface OnLongClickCellListener<CELL, VH, T> {
        void onLongClickCell(CELL cell, VH viewHolder, T item);
    }

    private int spanSize = 1;
    private T item;
    private OnClickCellListener onClickCellListener;
    private OnLongClickCellListener onLongClickCellListener;

    public SimpleCell(T item) {
        this.item = item;
    }

    @LayoutRes
    protected abstract int getLayoutRes();

    @NonNull
    protected abstract VH onCreateViewHolder(ViewGroup parent, View cellView);

    protected abstract void onBindViewHolder(VH holder, int position, Context context, Object payload);

    protected void onUnbindViewHolder(VH holder) {
    }

    public T getItem() {
        return item;
    }

    public void setItem(T item) {
        this.item = item;
    }

    protected abstract long getItemId();

    public int getSpanSize() {
        return spanSize;
    }

    public void setSpanSize(int spanSize) {
        this.spanSize = spanSize;
    }

    public void setOnClickCellListener(OnClickCellListener onClickCellListener) {
        this.onClickCellListener = onClickCellListener;
    }

    public void setOnLongClickCellListener(OnLongClickCellListener onLongClickCellListener) {
        this.onLongClickCellListener = onLongClickCellListener;
    }

    public OnClickCellListener getOnClickCellListener() {
        return onClickCellListener;
    }

    public OnLongClickCellListener getOnLongClickCellListener() {
        return onLongClickCellListener;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        SimpleCell<?, ?> cell = (SimpleCell<?, ?>) o;

        return getItemId() == cell.getItemId();

    }

    @Override
    public int hashCode() {
        return (int) (getItemId() ^ (getItemId() >>> 32));
    }

}
