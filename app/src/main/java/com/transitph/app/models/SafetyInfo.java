package com.transitph.app.models;

import java.io.Serializable;

public class SafetyInfo implements Serializable {
    private long id;
    private String locationName;
    private String municipality;
    private String province;
    private String crowdLevel; // Light, Moderate, High
    private String lightingCondition; // Well Lit, Moderate, Poorly Lit
    private int safetyScore; // 1 to 100 based on verified criteria and reports
    private String safetyNotes;
    private int activeReportCount;
    private String lastUpdated;

    public SafetyInfo() {}

    public SafetyInfo(long id, String locationName, String municipality, String province,
                      String crowdLevel, String lightingCondition, int safetyScore,
                      String safetyNotes, int activeReportCount, String lastUpdated) {
        this.id = id;
        this.locationName = locationName;
        this.municipality = municipality;
        this.province = province;
        this.crowdLevel = crowdLevel;
        this.lightingCondition = lightingCondition;
        this.safetyScore = safetyScore;
        this.safetyNotes = safetyNotes;
        this.activeReportCount = activeReportCount;
        this.lastUpdated = lastUpdated;
    }

    public long getId() { return id; }
    public void setId(long id) { this.id = id; }

    public String getLocationName() { return locationName; }
    public void setLocationName(String locationName) { this.locationName = locationName; }

    public String getMunicipality() { return municipality; }
    public void setMunicipality(String municipality) { this.municipality = municipality; }

    public String getProvince() { return province; }
    public void setProvince(String province) { this.province = province; }

    public String getCrowdLevel() { return crowdLevel; }
    public void setCrowdLevel(String crowdLevel) { this.crowdLevel = crowdLevel; }

    public String getLightingCondition() { return lightingCondition; }
    public void setLightingCondition(String lightingCondition) { this.lightingCondition = lightingCondition; }

    public int getSafetyScore() { return safetyScore; }
    public void setSafetyScore(int safetyScore) { this.safetyScore = safetyScore; }

    public String getSafetyNotes() { return safetyNotes; }
    public void setSafetyNotes(String safetyNotes) { this.safetyNotes = safetyNotes; }

    public int getActiveReportCount() { return activeReportCount; }
    public void setActiveReportCount(int activeReportCount) { this.activeReportCount = activeReportCount; }

    public String getLastUpdated() { return lastUpdated; }
    public void setLastUpdated(String lastUpdated) { this.lastUpdated = lastUpdated; }
}
