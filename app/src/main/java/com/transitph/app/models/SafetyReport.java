package com.transitph.app.models;

import java.io.Serializable;

public class SafetyReport implements Serializable {
    private long id;
    private long userId;
    private String userFullName;
    private String category; // Unsafe Walking Area, Poor Lighting, Suspicious Activity, Incorrect Fare, Closed Terminal
    private String location;
    private String description;
    private String status; // PENDING_REVIEW, VERIFIED, RESOLVED, DISMISSED
    private String severity; // LOW, MEDIUM, HIGH
    private String createdAt;
    private String adminNotes;

    public SafetyReport() {}

    public SafetyReport(long id, long userId, String userFullName, String category, String location,
                        String description, String status, String severity, String createdAt, String adminNotes) {
        this.id = id;
        this.userId = userId;
        this.userFullName = userFullName;
        this.category = category;
        this.location = location;
        this.description = description;
        this.status = status;
        this.severity = severity;
        this.createdAt = createdAt;
        this.adminNotes = adminNotes;
    }

    public long getId() { return id; }
    public void setId(long id) { this.id = id; }

    public long getUserId() { return userId; }
    public void setUserId(long userId) { this.userId = userId; }

    public String getUserFullName() { return userFullName; }
    public void setUserFullName(String userFullName) { this.userFullName = userFullName; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getSeverity() { return severity; }
    public void setSeverity(String severity) { this.severity = severity; }

    public String getCreatedAt() { return createdAt; }
    public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }

    public String getAdminNotes() { return adminNotes; }
    public void setAdminNotes(String adminNotes) { this.adminNotes = adminNotes; }
}
