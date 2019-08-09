package com.vanniktech.emoji;

import android.graphics.Bitmap;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.drawable.Drawable;
import android.os.Handler;
import android.os.Looper;
import android.os.Message;
import android.support.v4.util.LruCache;
import android.support.v7.content.res.AppCompatResources;
import android.util.Log;
import android.widget.ImageView;

import java.lang.ref.WeakReference;
import java.util.LinkedList;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Semaphore;

final class ImageLoadingTask {
    /**
     * 图片缓存的核心类
     */
    private LruCache<String, Drawable> mLruCache;
    /**
     * 线程池
     */
    private ExecutorService mThreadPool;
    /**
     * 线程池的线程数量，默认为8
     */
    private static int THREAD_COUNT = 8;
    /**
     * 队列的调度方式
     */
    private Type mType = Type.LIFO;
    /**
     * 任务队列
     */
    private LinkedList<Runnable> mTasks;
    /**
     * 轮询的线程
     */
    private Thread mPoolThread;
    private Handler mPoolThreadHander;

    /**
     * 运行在UI线程的handler，用于给ImageView设置图片
     */
    private Handler mHandler;

    /**
     * 引入一个值为1的信号量，防止mPoolThreadHander未初始化完成
     */
    private volatile Semaphore mSemaphore = new Semaphore(1);

    /**
     * 引入一个值为1的信号量，由于线程池内部也有一个阻塞线程，防止加入任务的速度过快，使LIFO效果不明显
     */
    private volatile Semaphore mPoolSemaphore;

    private static ImageLoadingTask mInstance;

    /**
     * 队列的调度方式
     *
     * @author zhy
     */
    public enum Type {
        FIFO, LIFO
    }


    public static ImageLoadingTask getInstance() {
        if (mInstance == null) {
            synchronized (ImageLoadingTask.class) {
                if (mInstance == null) {
                    mInstance = new ImageLoadingTask(THREAD_COUNT, Type.LIFO);
                }
            }
        }
        return mInstance;
    }

    /**
     * 单例获得该实例对象
     *
     * @return
     */
    public static ImageLoadingTask getInstance(int threadCount, Type type) {
        if (mInstance == null) {
            synchronized (ImageLoadingTask.class) {
                if (mInstance == null) {
                    mInstance = new ImageLoadingTask(threadCount, type);
                }
            }
        }
        return mInstance;
    }

    ImageLoadingTask(int threadCount, Type type) {
        init(threadCount, type);
    }

    private void init(int threadCount, Type type) {
        // loop thread
        mPoolThread = new Thread() {
            @Override
            public void run() {
                try {
                    // 请求一个信号量
                    mSemaphore.acquire();
                } catch (InterruptedException e) {
                }
                Looper.prepare();

                mPoolThreadHander = new Handler() {
                    @Override
                    public void handleMessage(Message msg) {
                        mThreadPool.execute(getTask());
                        try {
                            mPoolSemaphore.acquire();
                        } catch (InterruptedException e) {
                        }
                    }
                };
                // 释放一个信号量
                mSemaphore.release();
                Looper.loop();
            }
        };
        mPoolThread.start();

        // 获取应用程序最大可用内存
        int maxMemory = (int) Runtime.getRuntime().maxMemory();
        int cacheSize = maxMemory / 10;
        mLruCache = new LruCache<String, Drawable>(cacheSize) {
            @Override
            protected int sizeOf(String key, Drawable drawable) {
                if (drawable instanceof BitmapDrawable) {
                    Bitmap bitmap = ((BitmapDrawable) drawable).getBitmap();
                    return bitmap.getByteCount() / 1024;
                }
                return 1;
            }
        };

        mThreadPool = Executors.newFixedThreadPool(threadCount);
        mPoolSemaphore = new Semaphore(threadCount);
        mTasks = new LinkedList<>();
        mType = type == null ? Type.LIFO : type;

    }

    /**
     * 加载图片
     *
     * @param imageView
     * @param resource
     */
    public void loadImage(final ImageView imageView, final int resource) {
        // set tag
        imageView.setTag("" + resource);
        // UI线程
        if (mHandler == null) {
            mHandler = new Handler() {
                @Override
                public void handleMessage(Message msg) {
                    ImageHolder holder = (ImageHolder) msg.obj;
                    ImageView imageView1 = holder.imageViewReference.get();
                    if (null == imageView1) {
                        return;
                    }
                    Drawable drawable = holder.drawable;
                    imageView1.setImageDrawable(drawable);
                }
            };
        }

        final Drawable drawable = getBitmapFromLruCache("" + resource);
        if (drawable != null) {
            ImageHolder holder = new ImageHolder();
            holder.imageViewReference = new WeakReference<>(imageView);
            holder.drawable = drawable;
            Message message = Message.obtain();
            message.obj = holder;
            mHandler.sendMessage(message);
        } else {
            addTask(new Runnable() {
                WeakReference<ImageView> imageViewReference = new WeakReference<>(imageView);

                @Override
                public void run() {

                    ImageView imageView1 = imageViewReference.get();
                    if (null == imageView1) {
                        return;
                    }
                    Drawable drawable;
                    try {
                        drawable = AppCompatResources.getDrawable(imageView1.getContext(), resource);
                    } catch (Exception e) {
                        Log.e(ImageLoadingTask.class.getSimpleName(), e.getMessage(), e);
                        return;
                    }
                    if (null == drawable) {
                        return;
                    }
                    addBitmapToLruCache("" + resource, drawable);
                    ImageHolder holder = new ImageHolder();
                    holder.drawable = getBitmapFromLruCache("" + resource);
                    holder.imageViewReference = imageViewReference;
                    Message message = Message.obtain();
                    message.obj = holder;
                    mHandler.sendMessage(message);
                    mPoolSemaphore.release();
                }
            });
        }

    }

    /**
     * 从LruCache中获取一张图片，如果不存在就返回null。
     */
    private Drawable getBitmapFromLruCache(String key) {
        return mLruCache.get(key);
    }

    /**
     * 往LruCache中添加一张图片
     *
     * @param key
     * @param drawable
     */
    private void addBitmapToLruCache(String key, Drawable drawable) {
        if (getBitmapFromLruCache(key) == null) {
            if (drawable != null)
                mLruCache.put(key, drawable);
        }
    }

    /**
     * 添加一个任务
     *
     * @param runnable
     */
    private synchronized void addTask(Runnable runnable) {
        try {
            // 请求信号量，防止mPoolThreadHander为null
            if (mPoolThreadHander == null)
                mSemaphore.acquire();
            mTasks.add(runnable);
            mPoolThreadHander.sendEmptyMessage(0x110);
        } catch (Exception e) {
            Log.e(ImageLoadingTask.class.getSimpleName(), e.getMessage(), e);
        }
    }

    /**
     * 取出一个任务
     *
     * @return
     */
    private synchronized Runnable getTask() {
        if (mType == Type.FIFO) {
            return mTasks.removeFirst();
        } else if (mType == Type.LIFO) {
            return mTasks.removeLast();
        }
        return null;
    }

    private class ImageHolder {
        WeakReference<ImageView> imageViewReference;
        Drawable drawable;
    }

    /**
     * 清空缓存
     */
    public void clearCache() {
        mLruCache.evictAll();
    }
}
