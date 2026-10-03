# TransitPH Production ProGuard / R8 Rules

# 1. Preserve Models and DTOs (used in SQLite, Gson serialization, and Retrofit)
-keep class com.transitph.app.models.** { *; }
-keepclassmembers class com.transitph.app.models.** { *; }

# 2. Gson Serialization Rules
-keepattributes Signature
-keepattributes *Annotation*
-keep class sun.misc.Unsafe { *; }
-keep class com.google.gson.** { *; }
-keepclassmembers class * {
    @com.google.gson.annotations.SerializedName <fields>;
}

# 3. Retrofit & OkHttp Networking Rules
-dontwarn okio.**
-dontwarn javax.annotation.**
-dontwarn org.conscrypt.**
-keep class retrofit2.** { *; }
-keepclasseswithmembers class * {
    @retrofit2.http.* <methods>;
}
-keep class okhttp3.** { *; }
-keep interface okhttp3.** { *; }

# 4. AndroidX & Room Persistence Rules
-keep class androidx.room.** { *; }
-keepclassmembers class * extends androidx.room.RoomDatabase {
    public <init>();
}
-dontwarn androidx.room.paging.**

# 5. View Binding Rules
-keepclassmembers class * implements androidx.viewbinding.ViewBinding {
    public static * inflate(android.view.LayoutInflater);
    public static * inflate(android.view.LayoutInflater, android.view.ViewGroup, boolean);
    public static * bind(android.view.View);
}

# 6. Material Components & Support Libraries
-keep class com.google.android.material.** { *; }
-dontwarn com.google.android.material.**

# 7. Database & SQLite Helpers
-keep class com.transitph.app.database.** { *; }
-keepclassmembers class com.transitph.app.database.** { *; }

