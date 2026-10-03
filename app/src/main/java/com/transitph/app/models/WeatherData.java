package com.transitph.app.models;

import java.io.Serializable;

public class WeatherData implements Serializable {
    private String locationName;
    private double temperature;
    private String condition; // Sunny, Cloudy, Rainy, Thunderstorm
    private int rainProbabilityPercent;
    private int humidityPercent;
    private double windSpeedKmh;
    private String warningMessage; // Umbrella advice, severe rain warning
    private String lastUpdated;

    public WeatherData() {}

    public WeatherData(String locationName, double temperature, String condition,
                       int rainProbabilityPercent, int humidityPercent, double windSpeedKmh,
                       String warningMessage, String lastUpdated) {
        this.locationName = locationName;
        this.temperature = temperature;
        this.condition = condition;
        this.rainProbabilityPercent = rainProbabilityPercent;
        this.humidityPercent = humidityPercent;
        this.windSpeedKmh = windSpeedKmh;
        this.warningMessage = warningMessage;
        this.lastUpdated = lastUpdated;
    }

    public String getLocationName() { return locationName; }
    public void setLocationName(String locationName) { this.locationName = locationName; }

    public double getTemperature() { return temperature; }
    public void setTemperature(double temperature) { this.temperature = temperature; }

    public String getCondition() { return condition; }
    public void setCondition(String condition) { this.condition = condition; }

    public int getRainProbabilityPercent() { return rainProbabilityPercent; }
    public void setRainProbabilityPercent(int rainProbabilityPercent) { this.rainProbabilityPercent = rainProbabilityPercent; }

    public int getHumidityPercent() { return humidityPercent; }
    public void setHumidityPercent(int humidityPercent) { this.humidityPercent = humidityPercent; }

    public double getWindSpeedKmh() { return windSpeedKmh; }
    public void setWindSpeedKmh(double windSpeedKmh) { this.windSpeedKmh = windSpeedKmh; }

    public String getWarningMessage() { return warningMessage; }
    public void setWarningMessage(String warningMessage) { this.warningMessage = warningMessage; }

    public String getLastUpdated() { return lastUpdated; }
    public void setLastUpdated(String lastUpdated) { this.lastUpdated = lastUpdated; }
}
