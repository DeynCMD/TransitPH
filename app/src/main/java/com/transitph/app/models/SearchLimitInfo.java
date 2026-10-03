package com.transitph.app.models;

import java.io.Serializable;

public class SearchLimitInfo implements Serializable {
    private boolean isAllowed;
    private int remainingCount;
    private int totalLimit;
    private String nextResetTime;
    private boolean isPremium;
    private String message;

    public SearchLimitInfo() {}

    public SearchLimitInfo(boolean isAllowed, int remainingCount, int totalLimit,
                           String nextResetTime, boolean isPremium, String message) {
        this.isAllowed = isAllowed;
        this.remainingCount = remainingCount;
        this.totalLimit = totalLimit;
        this.nextResetTime = nextResetTime;
        this.isPremium = isPremium;
        this.message = message;
    }

    public boolean isAllowed() { return isAllowed; }
    public void setAllowed(boolean allowed) { isAllowed = allowed; }

    public int getRemainingCount() { return remainingCount; }
    public void setRemainingCount(int remainingCount) { this.remainingCount = remainingCount; }

    public int getTotalLimit() { return totalLimit; }
    public void setTotalLimit(int totalLimit) { this.totalLimit = totalLimit; }

    public String getNextResetTime() { return nextResetTime; }
    public void setNextResetTime(String nextResetTime) { this.nextResetTime = nextResetTime; }

    public boolean isPremium() { return isPremium; }
    public void setPremium(boolean premium) { isPremium = premium; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}
