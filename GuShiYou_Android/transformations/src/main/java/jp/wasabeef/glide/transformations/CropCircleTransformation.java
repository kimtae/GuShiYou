/*
 * Created by 邱志立 on 17-2-23 下午1:35
 * Copyright (c) 2017. All rights reserved.
 */

package jp.wasabeef.glide.transformations;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapShader;
import android.graphics.Canvas;
import android.graphics.Matrix;
import android.graphics.Paint;

import com.bumptech.glide.Glide;
import com.bumptech.glide.load.Transformation;
import com.bumptech.glide.load.engine.Resource;
import com.bumptech.glide.load.engine.bitmap_recycle.BitmapPool;
import com.bumptech.glide.load.resource.bitmap.BitmapResource;

public class CropCircleTransformation implements Transformation<Bitmap> {

    private BitmapPool mBitmapPool;
    private int mBorderWidth;
    private int mBorderColor;

    public CropCircleTransformation(Context context) {
        this(context, 0, 0);
    }

    public CropCircleTransformation(Context context, int borderWidth, int borderColor) {
        this(Glide.get(context).getBitmapPool(), borderWidth, borderColor);
    }

    public CropCircleTransformation(BitmapPool pool, int borderWidth, int borderColor) {
        this.mBitmapPool = pool;
        mBorderWidth = borderWidth;
        mBorderColor = borderColor;
    }

    @Override
    public Resource<Bitmap> transform(Resource<Bitmap> resource, int outWidth, int outHeight) {
        Bitmap source = resource.get();
        int size = Math.min(source.getWidth(), source.getHeight());

        int width = (source.getWidth() - size) / 2;
        int height = (source.getHeight() - size) / 2;

        Bitmap bitmap = mBitmapPool.get(size, size, Bitmap.Config.ARGB_8888);
        if (bitmap == null) {
            bitmap = Bitmap.createBitmap(size, size, Bitmap.Config.ARGB_8888);
        }

        Canvas canvas = new Canvas(bitmap);
        Paint paint = new Paint();
        BitmapShader shader =
                new BitmapShader(source, BitmapShader.TileMode.CLAMP, BitmapShader.TileMode.CLAMP);
        if (width != 0 || height != 0) {
            // source isn't square, move viewport to center
            Matrix matrix = new Matrix();
            matrix.setTranslate(-width, -height);
            shader.setLocalMatrix(matrix);
        }
        paint.setShader(shader);
        paint.setAntiAlias(true);

        float r = size / 2f;
        canvas.drawCircle(r, r, r, paint);
        drawRing(canvas, r);
        return BitmapResource.obtain(bitmap, mBitmapPool);
    }

    /**
     * 绘制环形
     *
     * @param canvas
     * @param radius
     */
    private void drawRing(Canvas canvas, float radius) {
        if (mBorderWidth > 0 && mBorderColor != 0) {
            Paint paint = new Paint();
            paint.setAntiAlias(true);
            paint.setColor(mBorderColor);
            paint.setStrokeWidth(mBorderWidth);
            paint.setStyle(Paint.Style.STROKE);
            canvas.drawCircle(radius, radius, radius - mBorderWidth / 2, paint);
        }
    }

    @Override
    public String getId() {
        return "CropCircleTransformation()";
    }
}
