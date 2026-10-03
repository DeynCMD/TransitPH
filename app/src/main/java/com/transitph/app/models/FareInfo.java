package com.transitph.app.models;

import java.io.Serializable;

public class FareInfo implements Serializable {
    private long id;
    private String transportType;
    private double baseFare;
    private double firstKmDistance;
    private double succeedingKmRate;
    private double studentPwdDiscountPercent; // typically 20%
    private String ltfrbIssuanceNumber;
    private String lastVerifiedDate;
    private String notes;

    public FareInfo() {}

    public FareInfo(long id, String transportType, double baseFare, double firstKmDistance,
                    double succeedingKmRate, double studentPwdDiscountPercent,
                    String ltfrbIssuanceNumber, String lastVerifiedDate, String notes) {
        this.id = id;
        this.transportType = transportType;
        this.baseFare = baseFare;
        this.firstKmDistance = firstKmDistance;
        this.succeedingKmRate = succeedingKmRate;
        this.studentPwdDiscountPercent = studentPwdDiscountPercent;
        this.ltfrbIssuanceNumber = ltfrbIssuanceNumber;
        this.lastVerifiedDate = lastVerifiedDate;
        this.notes = notes;
    }

    public long getId() { return id; }
    public void setId(long id) { this.id = id; }

    public String getTransportType() { return transportType; }
    public void setTransportType(String transportType) { this.transportType = transportType; }

    public double getBaseFare() { return baseFare; }
    public void setBaseFare(double baseFare) { this.baseFare = baseFare; }

    public double getFirstKmDistance() { return firstKmDistance; }
    public void setFirstKmDistance(double firstKmDistance) { this.firstKmDistance = firstKmDistance; }

    public double getSucceedingKmRate() { return succeedingKmRate; }
    public void setSucceedingKmRate(double succeedingKmRate) { this.succeedingKmRate = succeedingKmRate; }

    public double getStudentPwdDiscountPercent() { return studentPwdDiscountPercent; }
    public void setStudentPwdDiscountPercent(double studentPwdDiscountPercent) { this.studentPwdDiscountPercent = studentPwdDiscountPercent; }

    public String getLtfrbIssuanceNumber() { return ltfrbIssuanceNumber; }
    public void setLtfrbIssuanceNumber(String ltfrbIssuanceNumber) { this.ltfrbIssuanceNumber = ltfrbIssuanceNumber; }

    public String getLastVerifiedDate() { return lastVerifiedDate; }
    public void setLastVerifiedDate(String lastVerifiedDate) { this.lastVerifiedDate = lastVerifiedDate; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}
