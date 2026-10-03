package com.transitph.app.models;

import java.io.Serializable;

public class AuditLog implements Serializable {
    private long id;
    private long userId;
    private String userEmail;
    private String action; // CREATE_TERMINAL, UPDATE_ROUTE, MODERATE_REPORT, RESOLVE_REPORT
    private String targetEntity;
    private long targetId;
    private String details;
    private String timestamp;

    public AuditLog() {}

    public AuditLog(long id, long userId, String userEmail, String action, String targetEntity,
                    long targetId, String details, String timestamp) {
        this.id = id;
        this.userId = userId;
        this.userEmail = userEmail;
        this.action = action;
        this.targetEntity = targetEntity;
        this.targetId = targetId;
        this.details = details;
        this.timestamp = timestamp;
    }

    public long getId() { return id; }
    public void setId(long id) { this.id = id; }

    public long getUserId() { return userId; }
    public void setUserId(long userId) { this.userId = userId; }

    public String getUserEmail() { return userEmail; }
    public void setUserEmail(String userEmail) { this.userEmail = userEmail; }

    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }

    public String getTargetEntity() { return targetEntity; }
    public void setTargetEntity(String targetEntity) { this.targetEntity = targetEntity; }

    public long getTargetId() { return targetId; }
    public void setTargetId(long targetId) { this.targetId = targetId; }

    public String getDetails() { return details; }
    public void setDetails(String details) { this.details = details; }

    public String getTimestamp() { return timestamp; }
    public void setTimestamp(String timestamp) { this.timestamp = timestamp; }
}
