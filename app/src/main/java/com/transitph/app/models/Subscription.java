package com.transitph.app.models;

import java.io.Serializable;

public class Subscription implements Serializable {
    private long id;
    private long userId;
    private String planType; // FREE, PREMIUM_MONTHLY, PREMIUM_ANNUAL
    private String status; // ACTIVE, EXPIRED, CANCELLED
    private int dailySearchLimit;
    private int remainingSearchesToday;
    private String resetTime;
    private boolean isOfflineAccessEnabled;
    private boolean isAdFree;
    private boolean isLiveTrafficEnabled;

    public Subscription() {}

    public Subscription(long id, long userId, String planType, String status, int dailySearchLimit,
                        int remainingSearchesToday, String resetTime, boolean isOfflineAccessEnabled) {
        this.id = id;
        this.userId = userId;
        this.planType = planType;
        this.status = status;
        this.dailySearchLimit = dailySearchLimit;
        this.remainingSearchesToday = remainingSearchesToday;
        this.resetTime = resetTime;
        this.isOfflineAccessEnabled = isOfflineAccessEnabled;
        this.isAdFree = "PREMIUM_MONTHLY".equals(planType) || "PREMIUM_ANNUAL".equals(planType);
        this.isLiveTrafficEnabled = this.isAdFree;
    }

    public long getId() { return id; }
    public void setId(long id) { this.id = id; }

    public long getUserId() { return userId; }
    public void setUserId(long userId) { this.userId = userId; }

    public String getPlanType() { return planType; }
    public void setPlanType(String planType) { this.planType = planType; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public int getDailySearchLimit() { return dailySearchLimit; }
    public void setDailySearchLimit(int dailySearchLimit) { this.dailySearchLimit = dailySearchLimit; }

    public int getRemainingSearchesToday() { return remainingSearchesToday; }
    public void setRemainingSearchesToday(int remainingSearchesToday) { this.remainingSearchesToday = remainingSearchesToday; }

    public String getResetTime() { return resetTime; }
    public void setResetTime(String resetTime) { this.resetTime = resetTime; }

    public boolean isOfflineAccessEnabled() { return isOfflineAccessEnabled; }
    public void setOfflineAccessEnabled(boolean offlineAccessEnabled) { isOfflineAccessEnabled = offlineAccessEnabled; }

    public boolean isAdFree() { return isAdFree; }
    public void setAdFree(boolean adFree) { isAdFree = adFree; }

    public boolean isLiveTrafficEnabled() { return isLiveTrafficEnabled; }
    public void setLiveTrafficEnabled(boolean liveTrafficEnabled) { isLiveTrafficEnabled = liveTrafficEnabled; }
}
