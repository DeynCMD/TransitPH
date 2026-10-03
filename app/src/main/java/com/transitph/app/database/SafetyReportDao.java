package com.transitph.app.database;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;

import com.transitph.app.models.SafetyInfo;
import com.transitph.app.models.SafetyReport;

import java.util.ArrayList;
import java.util.List;

public class SafetyReportDao {
    private final DatabaseHelper dbHelper;

    public SafetyReportDao(Context context) {
        this.dbHelper = DatabaseHelper.getInstance(context);
    }

    public List<SafetyReport> getAllReports() {
        List<SafetyReport> list = new ArrayList<>();
        SQLiteDatabase db = dbHelper.getReadableDatabase();
        Cursor cursor = db.query(DatabaseHelper.TABLE_SAFETY_REPORTS, null, null, null, null, null, DatabaseHelper.COL_REPORT_CREATED_AT + " DESC");

        if (cursor != null && cursor.moveToFirst()) {
            do {
                list.add(cursorToReport(cursor));
            } while (cursor.moveToNext());
            cursor.close();
        }
        return list;
    }

    public List<SafetyReport> getReportsByUser(long userId) {
        List<SafetyReport> list = new ArrayList<>();
        SQLiteDatabase db = dbHelper.getReadableDatabase();
        Cursor cursor = db.query(
                DatabaseHelper.TABLE_SAFETY_REPORTS,
                null,
                DatabaseHelper.COL_REPORT_USER_ID + "=?",
                new String[]{String.valueOf(userId)},
                null, null,
                DatabaseHelper.COL_REPORT_CREATED_AT + " DESC"
        );

        if (cursor != null && cursor.moveToFirst()) {
            do {
                list.add(cursorToReport(cursor));
            } while (cursor.moveToNext());
            cursor.close();
        }
        return list;
    }

    public long insertReport(SafetyReport report) {
        SQLiteDatabase db = dbHelper.getWritableDatabase();
        ContentValues cv = new ContentValues();
        cv.put(DatabaseHelper.COL_REPORT_USER_ID, report.getUserId());
        cv.put(DatabaseHelper.COL_REPORT_USER_NAME, report.getUserFullName());
        cv.put(DatabaseHelper.COL_REPORT_CATEGORY, report.getCategory());
        cv.put(DatabaseHelper.COL_REPORT_LOCATION, report.getLocation());
        cv.put(DatabaseHelper.COL_REPORT_DESC, report.getDescription());
        cv.put(DatabaseHelper.COL_REPORT_STATUS, report.getStatus());
        cv.put(DatabaseHelper.COL_REPORT_SEVERITY, report.getSeverity());
        cv.put(DatabaseHelper.COL_REPORT_CREATED_AT, report.getCreatedAt());
        cv.put(DatabaseHelper.COL_REPORT_ADMIN_NOTES, report.getAdminNotes());
        return db.insert(DatabaseHelper.TABLE_SAFETY_REPORTS, null, cv);
    }

    public int updateReportStatus(long reportId, String newStatus, String adminNotes) {
        SQLiteDatabase db = dbHelper.getWritableDatabase();
        ContentValues cv = new ContentValues();
        cv.put(DatabaseHelper.COL_REPORT_STATUS, newStatus);
        if (adminNotes != null) {
            cv.put(DatabaseHelper.COL_REPORT_ADMIN_NOTES, adminNotes);
        }
        return db.update(DatabaseHelper.TABLE_SAFETY_REPORTS, cv, DatabaseHelper.COL_REPORT_ID + "=?", new String[]{String.valueOf(reportId)});
    }

    public List<SafetyInfo> getAllSafetyInfo() {
        List<SafetyInfo> list = new ArrayList<>();
        SQLiteDatabase db = dbHelper.getReadableDatabase();
        Cursor cursor = db.query(DatabaseHelper.TABLE_SAFETY_INFO, null, null, null, null, null, DatabaseHelper.COL_INFO_LOCATION + " ASC");

        if (cursor != null && cursor.moveToFirst()) {
            do {
                SafetyInfo info = new SafetyInfo();
                info.setId(cursor.getLong(cursor.getColumnIndexOrThrow(DatabaseHelper.COL_INFO_ID)));
                info.setLocationName(cursor.getString(cursor.getColumnIndexOrThrow(DatabaseHelper.COL_INFO_LOCATION)));
                info.setMunicipality(cursor.getString(cursor.getColumnIndexOrThrow(DatabaseHelper.COL_INFO_MUNICIPALITY)));
                info.setProvince(cursor.getString(cursor.getColumnIndexOrThrow(DatabaseHelper.COL_INFO_PROVINCE)));
                info.setCrowdLevel(cursor.getString(cursor.getColumnIndexOrThrow(DatabaseHelper.COL_INFO_CROWD)));
                info.setLightingCondition(cursor.getString(cursor.getColumnIndexOrThrow(DatabaseHelper.COL_INFO_LIGHTING)));
                info.setSafetyScore(cursor.getInt(cursor.getColumnIndexOrThrow(DatabaseHelper.COL_INFO_SCORE)));
                info.setSafetyNotes(cursor.getString(cursor.getColumnIndexOrThrow(DatabaseHelper.COL_INFO_NOTES)));
                info.setActiveReportCount(cursor.getInt(cursor.getColumnIndexOrThrow(DatabaseHelper.COL_INFO_REPORTS_COUNT)));
                info.setLastUpdated(cursor.getString(cursor.getColumnIndexOrThrow(DatabaseHelper.COL_INFO_UPDATED)));
                list.add(info);
            } while (cursor.moveToNext());
            cursor.close();
        }
        return list;
    }

    private SafetyReport cursorToReport(Cursor c) {
        SafetyReport r = new SafetyReport();
        r.setId(c.getLong(c.getColumnIndexOrThrow(DatabaseHelper.COL_REPORT_ID)));
        r.setUserId(c.getLong(c.getColumnIndexOrThrow(DatabaseHelper.COL_REPORT_USER_ID)));
        r.setUserFullName(c.getString(c.getColumnIndexOrThrow(DatabaseHelper.COL_REPORT_USER_NAME)));
        r.setCategory(c.getString(c.getColumnIndexOrThrow(DatabaseHelper.COL_REPORT_CATEGORY)));
        r.setLocation(c.getString(c.getColumnIndexOrThrow(DatabaseHelper.COL_REPORT_LOCATION)));
        r.setDescription(c.getString(c.getColumnIndexOrThrow(DatabaseHelper.COL_REPORT_DESC)));
        r.setStatus(c.getString(c.getColumnIndexOrThrow(DatabaseHelper.COL_REPORT_STATUS)));
        r.setSeverity(c.getString(c.getColumnIndexOrThrow(DatabaseHelper.COL_REPORT_SEVERITY)));
        r.setCreatedAt(c.getString(c.getColumnIndexOrThrow(DatabaseHelper.COL_REPORT_CREATED_AT)));
        r.setAdminNotes(c.getString(c.getColumnIndexOrThrow(DatabaseHelper.COL_REPORT_ADMIN_NOTES)));
        return r;
    }
}
