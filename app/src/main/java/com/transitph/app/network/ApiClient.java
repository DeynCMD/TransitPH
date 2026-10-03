package com.transitph.app.network;

import android.content.Context;

import java.util.concurrent.TimeUnit;

import okhttp3.OkHttpClient;
import okhttp3.logging.HttpLoggingInterceptor;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class ApiClient {
    // Default URL points to the local backend; 10.0.2.2 is the Android Emulator alias for localhost
    // On physical devices or production, this can be configured via environment or SharedPreferences
    private static final String DEFAULT_BASE_URL = "http://10.0.2.2:3000/api/v1/";
    private static String sCustomBaseUrl = null;
    private static Retrofit sRetrofit = null;
    private static ApiService sApiService = null;

    public static void setCustomBaseUrl(String url) {
        if (url != null && !url.endsWith("/")) {
            url = url + "/";
        }
        sCustomBaseUrl = url;
        sRetrofit = null;
        sApiService = null;
    }

    public static String getBaseUrl() {
        return sCustomBaseUrl != null ? sCustomBaseUrl : DEFAULT_BASE_URL;
    }

    public static synchronized ApiService getApiService(Context context) {
        if (sApiService == null) {
            HttpLoggingInterceptor logging = new HttpLoggingInterceptor();
            logging.setLevel(HttpLoggingInterceptor.Level.BODY);

            OkHttpClient okHttpClient = new OkHttpClient.Builder()
                    .connectTimeout(15, TimeUnit.SECONDS)
                    .readTimeout(20, TimeUnit.SECONDS)
                    .writeTimeout(20, TimeUnit.SECONDS)
                    .addInterceptor(logging)
                    .retryOnConnectionFailure(true)
                    .build();

            sRetrofit = new Retrofit.Builder()
                    .baseUrl(getBaseUrl())
                    .client(okHttpClient)
                    .addConverterFactory(GsonConverterFactory.create())
                    .build();

            sApiService = sRetrofit.create(ApiService.class);
        }
        return sApiService;
    }
}
