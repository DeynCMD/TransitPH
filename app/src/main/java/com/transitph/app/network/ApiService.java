package com.transitph.app.network;

import com.transitph.app.models.AuditLog;
import com.transitph.app.models.Destination;
import com.transitph.app.models.FareInfo;
import com.transitph.app.models.Route;
import com.transitph.app.models.RouteWeather;
import com.transitph.app.models.SafetyInfo;
import com.transitph.app.models.SafetyReport;
import com.transitph.app.models.SavedRoute;
import com.transitph.app.models.SearchLimitInfo;
import com.transitph.app.models.Subscription;
import com.transitph.app.models.Terminal;
import com.transitph.app.models.User;
import com.transitph.app.models.WeatherData;

import java.util.List;
import java.util.Map;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.DELETE;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.PATCH;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.Path;
import retrofit2.http.Query;

public interface ApiService {

    // --- Authentication & Profile ---
    @POST("auth/login")
    Call<ApiResponse<Map<String, Object>>> login(@Body Map<String, String> credentials);

    @POST("auth/register")
    Call<ApiResponse<Map<String, Object>>> register(@Body Map<String, String> registrationData);

    @GET("auth/me")
    Call<ApiResponse<User>> getCurrentUser(@Header("Authorization") String authHeader);

    @POST("auth/change-password")
    Call<ApiResponse<Void>> changePassword(@Header("Authorization") String authHeader, @Body Map<String, String> passwordData);

    @POST("auth/forgot-password")
    Call<ApiResponse<Void>> forgotPassword(@Body Map<String, String> emailData);

    // --- Routes & Multi-Modal Planning ---
    @GET("routes")
    Call<ApiResponse<List<Route>>> searchRoutes(
            @Query("origin") String origin,
            @Query("destination") String destination,
            @Query("transportType") String transportType,
            @Query("sort") String sort,
            @Query("maxFare") Double maxFare
    );

    @GET("routes/{id}")
    Call<ApiResponse<Route>> getRouteById(@Path("id") long routeId);

    @GET("routes/{id}/weather")
    Call<ApiResponse<RouteWeather>> getRouteWeather(@Path("id") long routeId);

    // --- Terminals Directory ---
    @GET("terminals")
    Call<ApiResponse<List<Terminal>>> getTerminals(
            @Query("province") String province,
            @Query("search") String search
    );

    @GET("terminals/{id}")
    Call<ApiResponse<Terminal>> getTerminalById(@Path("id") long terminalId);

    @GET("terminals/{id}/routes")
    Call<ApiResponse<List<Route>>> getRoutesByTerminal(@Path("id") long terminalId);

    // --- Destinations & Landmarks ---
    @GET("destinations")
    Call<ApiResponse<List<Destination>>> getDestinations(
            @Query("category") String category,
            @Query("province") String province,
            @Query("search") String search
    );

    @GET("destinations/{id}")
    Call<ApiResponse<Destination>> getDestinationById(@Path("id") long destinationId);

    // --- Commuter Safety & Incident Reports ---
    @GET("safety/reports")
    Call<ApiResponse<List<SafetyReport>>> getSafetyReports(
            @Query("category") String category,
            @Query("status") String status
    );

    @POST("safety/reports")
    Call<ApiResponse<SafetyReport>> submitSafetyReport(
            @Header("Authorization") String authHeader,
            @Body Map<String, Object> reportData
    );

    @GET("safety/info")
    Call<ApiResponse<List<SafetyInfo>>> getSafetyInfoByLocation(
            @Query("municipality") String municipality
    );

    // --- Weather Monitoring ---
    @GET("weather/current")
    Call<ApiResponse<WeatherData>> getCurrentWeather(
            @Query("lat") double lat,
            @Query("lng") double lng,
            @Query("location") String location
    );

    // --- Saved Routes (Cloud Sync) ---
    @GET("user/saved-routes")
    Call<ApiResponse<List<SavedRoute>>> getUserSavedRoutes(@Header("Authorization") String authHeader);

    @POST("user/saved-routes")
    Call<ApiResponse<SavedRoute>> saveRoute(
            @Header("Authorization") String authHeader,
            @Body Map<String, Object> savePayload
    );

    @DELETE("user/saved-routes/{id}")
    Call<ApiResponse<Void>> deleteSavedRoute(
            @Header("Authorization") String authHeader,
            @Path("id") long savedId
    );

    // --- Search Limit & Subscription ---
    @GET("subscription/status")
    Call<ApiResponse<SearchLimitInfo>> getSearchLimitStatus(@Header("Authorization") String authHeader);

    @POST("subscription/upgrade")
    Call<ApiResponse<Subscription>> upgradeSubscription(
            @Header("Authorization") String authHeader,
            @Body Map<String, String> planData
    );

    // --- Admin Endpoints ---
    @GET("admin/overview")
    Call<ApiResponse<Map<String, Object>>> getAdminOverview(@Header("Authorization") String authHeader);

    @POST("admin/terminals")
    Call<ApiResponse<Terminal>> createTerminal(@Header("Authorization") String authHeader, @Body Terminal terminal);

    @PUT("admin/terminals/{id}")
    Call<ApiResponse<Terminal>> updateTerminal(@Header("Authorization") String authHeader, @Path("id") long id, @Body Terminal terminal);

    @DELETE("admin/terminals/{id}")
    Call<ApiResponse<Void>> deleteTerminal(@Header("Authorization") String authHeader, @Path("id") long id);

    @POST("admin/routes")
    Call<ApiResponse<Route>> createRoute(@Header("Authorization") String authHeader, @Body Route route);

    @PUT("admin/routes/{id}")
    Call<ApiResponse<Route>> updateRoute(@Header("Authorization") String authHeader, @Path("id") long id, @Body Route route);

    @DELETE("admin/routes/{id}")
    Call<ApiResponse<Void>> deleteRoute(@Header("Authorization") String authHeader, @Path("id") long id);

    @POST("admin/destinations")
    Call<ApiResponse<Destination>> createDestination(@Header("Authorization") String authHeader, @Body Destination destination);

    @PUT("admin/destinations/{id}")
    Call<ApiResponse<Destination>> updateDestination(@Header("Authorization") String authHeader, @Path("id") long id, @Body Destination destination);

    @DELETE("admin/destinations/{id}")
    Call<ApiResponse<Void>> deleteDestination(@Header("Authorization") String authHeader, @Path("id") long id);

    @PATCH("admin/safety-reports/{id}/status")
    Call<ApiResponse<SafetyReport>> moderateSafetyReport(
            @Header("Authorization") String authHeader,
            @Path("id") long reportId,
            @Body Map<String, String> statusPayload
    );

    @GET("admin/audit-logs")
    Call<ApiResponse<List<AuditLog>>> getAuditLogs(@Header("Authorization") String authHeader);
}
