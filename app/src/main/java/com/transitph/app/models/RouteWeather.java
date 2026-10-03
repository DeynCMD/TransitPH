package com.transitph.app.models;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class RouteWeather implements Serializable {
    private long routeId;
    private WeatherData originWeather;
    private WeatherData destinationWeather;
    private String walkingSegmentAlert;
    private List<WeatherData> stopWeatherList = new ArrayList<>();

    public RouteWeather() {}

    public RouteWeather(long routeId, WeatherData originWeather, WeatherData destinationWeather, String walkingSegmentAlert) {
        this.routeId = routeId;
        this.originWeather = originWeather;
        this.destinationWeather = destinationWeather;
        this.walkingSegmentAlert = walkingSegmentAlert;
    }

    public long getRouteId() { return routeId; }
    public void setRouteId(long routeId) { this.routeId = routeId; }

    public WeatherData getOriginWeather() { return originWeather; }
    public void setOriginWeather(WeatherData originWeather) { this.originWeather = originWeather; }

    public WeatherData getDestinationWeather() { return destinationWeather; }
    public void setDestinationWeather(WeatherData destinationWeather) { this.destinationWeather = destinationWeather; }

    public String getWalkingSegmentAlert() { return walkingSegmentAlert; }
    public void setWalkingSegmentAlert(String walkingSegmentAlert) { this.walkingSegmentAlert = walkingSegmentAlert; }

    public List<WeatherData> getStopWeatherList() { return stopWeatherList; }
    public void setStopWeatherList(List<WeatherData> stopWeatherList) { this.stopWeatherList = stopWeatherList; }
}
