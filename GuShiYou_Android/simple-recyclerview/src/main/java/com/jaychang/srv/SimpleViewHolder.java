package com.jaychang.srv;

import android.support.v7.widget.RecyclerView;
import android.view.View;

public class SimpleViewHolder<T> extends RecyclerView.ViewHolder {

    private SimpleCell cell;

    public SimpleViewHolder(View itemView) {
        super(itemView);
    }

    void bind(SimpleCell cell) {
        this.cell = cell;
    }

    void unbind() {
        cell = null;
    }

    public SimpleCell getCell() {
        return cell;
    }

    public void setData(T data) {
    }
}
