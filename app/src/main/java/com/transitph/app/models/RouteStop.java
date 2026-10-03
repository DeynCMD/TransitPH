package com.transitph.app.models;

import java.io.Serializable;

public class RouteStop implements Serializable {
    private long id;
    private long routeId;
    private String stopName;
    private int sequence;
    private double latitude;
    private double longitude;

    public RouteStop() {}

    public RouteStop(long id, long routeId, String stopName, int sequence) {
        this.id = id;
        this.routeId = routeId;
        this.stopName = stopName;
        this.sequence = sequence;
    }

    public RouteStop(long id, long routeId, String stopName, int sequence, double latitude, double longitude) {
        this.id = id;
        this.routeId = routeId;
        this.stopName = stopName;
        this.sequence = sequence;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public long getId() { return id; }
    public void setId(long id) { this.id = id; }

    public long getRouteId() { return routeId; }
    public void setRouteId(long routeId) { this.routeId = routeId; }

    public String getStopName() { return stopName; }
    public void setStopName(String stopName) { this.stopName = stopName; }

    public int getSequence() { return sequence; }
    public void setSequence(int sequence) { this.sequence = sequence; }

    public double getLatitude() { return latitude; }
    public void setLatitude(double latitude) { this.latitude = latitude; }

    public double getLongitude() { return longitude; }
    public void setLongitude(double longitude) { this.longitude = longitude; }
}
