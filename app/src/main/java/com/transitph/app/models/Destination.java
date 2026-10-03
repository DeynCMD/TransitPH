package com.transitph.app.models;

import java.io.Serializable;

public class Destination implements Serializable {
    private long id;
    private String name;
    private String description;
    private String municipality;
    private String province;
    private String category; // Tourist Attraction, School/University, Shopping, Hospital, Government
    private double latitude;
    private double longitude;
    private String operatingHours;
    private long nearbyTerminalId;
    private String nearbyTerminalName;
    private String suggestedRoute;
    private String accessibilityInfo;
    private String imageUrl;

    public Destination() {}

    public Destination(long id, String name, String description, String municipality, String province,
                       String category, double latitude, double longitude, String operatingHours,
                       long nearbyTerminalId, String nearbyTerminalName, String suggestedRoute,
                       String accessibilityInfo, String imageUrl) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.municipality = municipality;
        this.province = province;
        this.category = category;
        this.latitude = latitude;
        this.longitude = longitude;
        this.operatingHours = operatingHours;
        this.nearbyTerminalId = nearbyTerminalId;
        this.nearbyTerminalName = nearbyTerminalName;
        this.suggestedRoute = suggestedRoute;
        this.accessibilityInfo = accessibilityInfo;
        this.imageUrl = imageUrl;
    }

    public long getId() { return id; }
    public void setId(long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getMunicipality() { return municipality; }
    public void setMunicipality(String municipality) { this.municipality = municipality; }

    public String getProvince() { return province; }
    public void setProvince(String province) { this.province = province; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public double getLatitude() { return latitude; }
    public void setLatitude(double latitude) { this.latitude = latitude; }

    public double getLongitude() { return longitude; }
    public void setLongitude(double longitude) { this.longitude = longitude; }

    public String getOperatingHours() { return operatingHours; }
    public void setOperatingHours(String operatingHours) { this.operatingHours = operatingHours; }

    public long getNearbyTerminalId() { return nearbyTerminalId; }
    public void setNearbyTerminalId(long nearbyTerminalId) { this.nearbyTerminalId = nearbyTerminalId; }

    public String getNearbyTerminalName() { return nearbyTerminalName; }
    public void setNearbyTerminalName(String nearbyTerminalName) { this.nearbyTerminalName = nearbyTerminalName; }

    public String getSuggestedRoute() { return suggestedRoute; }
    public void setSuggestedRoute(String suggestedRoute) { this.suggestedRoute = suggestedRoute; }

    public String getAccessibilityInfo() { return accessibilityInfo; }
    public void setAccessibilityInfo(String accessibilityInfo) { this.accessibilityInfo = accessibilityInfo; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
}
