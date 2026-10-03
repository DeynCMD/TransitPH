package com.transitph.app.database;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;

import com.transitph.app.models.Destination;

import java.util.ArrayList;
import java.util.List;

public class DestinationDao {
    private final DatabaseHelper dbHelper;

    public DestinationDao(Context context) {
        this.dbHelper = DatabaseHelper.getInstance(context);
    }

    public List<Destination> getAllDestinations() {
        List<Destination> list = new ArrayList<>();
        SQLiteDatabase db = dbHelper.getReadableDatabase();
        Cursor cursor = db.query(DatabaseHelper.TABLE_DESTINATIONS, null, null, null, null, null, DatabaseHelper.COL_DEST_NAME + " ASC");

        if (cursor != null && cursor.moveToFirst()) {
            do {
                list.add(cursorToDestination(cursor));
            } while (cursor.moveToNext());
            cursor.close();
        }
        return list;
    }

    public List<Destination> getDestinationsByCategory(String category) {
        List<Destination> list = new ArrayList<>();
        SQLiteDatabase db = dbHelper.getReadableDatabase();
        Cursor cursor = db.query(
                DatabaseHelper.TABLE_DESTINATIONS,
                null,
                DatabaseHelper.COL_DEST_CATEGORY + "=?",
                new String[]{category},
                null, null,
                DatabaseHelper.COL_DEST_NAME + " ASC"
        );

        if (cursor != null && cursor.moveToFirst()) {
            do {
                list.add(cursorToDestination(cursor));
            } while (cursor.moveToNext());
            cursor.close();
        }
        return list;
    }

    public List<Destination> searchDestinations(String query) {
        List<Destination> list = new ArrayList<>();
        SQLiteDatabase db = dbHelper.getReadableDatabase();
        String wild = "%" + query.trim() + "%";
        Cursor cursor = db.query(
                DatabaseHelper.TABLE_DESTINATIONS,
                null,
                DatabaseHelper.COL_DEST_NAME + " LIKE ? OR " + DatabaseHelper.COL_DEST_MUNICIPALITY + " LIKE ? OR " + DatabaseHelper.COL_DEST_CATEGORY + " LIKE ?",
                new String[]{wild, wild, wild},
                null, null,
                DatabaseHelper.COL_DEST_NAME + " ASC"
        );

        if (cursor != null && cursor.moveToFirst()) {
            do {
                list.add(cursorToDestination(cursor));
            } while (cursor.moveToNext());
            cursor.close();
        }
        return list;
    }

    public Destination getDestinationById(long id) {
        SQLiteDatabase db = dbHelper.getReadableDatabase();
        Cursor cursor = db.query(
                DatabaseHelper.TABLE_DESTINATIONS,
                null,
                DatabaseHelper.COL_DEST_ID + "=?",
                new String[]{String.valueOf(id)},
                null, null, null
        );

        Destination d = null;
        if (cursor != null && cursor.moveToFirst()) {
            d = cursorToDestination(cursor);
            cursor.close();
        }
        return d;
    }

    public long insertDestination(Destination d) {
        SQLiteDatabase db = dbHelper.getWritableDatabase();
        ContentValues cv = destinationToContentValues(d);
        return db.insert(DatabaseHelper.TABLE_DESTINATIONS, null, cv);
    }

    public int updateDestination(Destination d) {
        SQLiteDatabase db = dbHelper.getWritableDatabase();
        ContentValues cv = destinationToContentValues(d);
        return db.update(DatabaseHelper.TABLE_DESTINATIONS, cv, DatabaseHelper.COL_DEST_ID + "=?", new String[]{String.valueOf(d.getId())});
    }

    public int deleteDestination(long id) {
        SQLiteDatabase db = dbHelper.getWritableDatabase();
        return db.delete(DatabaseHelper.TABLE_DESTINATIONS, DatabaseHelper.COL_DEST_ID + "=?", new String[]{String.valueOf(id)});
    }

    private Destination cursorToDestination(Cursor c) {
        Destination d = new Destination();
        d.setId(c.getLong(c.getColumnIndexOrThrow(DatabaseHelper.COL_DEST_ID)));
        d.setName(c.getString(c.getColumnIndexOrThrow(DatabaseHelper.COL_DEST_NAME)));
        d.setDescription(c.getString(c.getColumnIndexOrThrow(DatabaseHelper.COL_DEST_DESC)));
        d.setMunicipality(c.getString(c.getColumnIndexOrThrow(DatabaseHelper.COL_DEST_MUNICIPALITY)));
        d.setProvince(c.getString(c.getColumnIndexOrThrow(DatabaseHelper.COL_DEST_PROVINCE)));
        d.setCategory(c.getString(c.getColumnIndexOrThrow(DatabaseHelper.COL_DEST_CATEGORY)));
        d.setLatitude(c.getDouble(c.getColumnIndexOrThrow(DatabaseHelper.COL_DEST_LAT)));
        d.setLongitude(c.getDouble(c.getColumnIndexOrThrow(DatabaseHelper.COL_DEST_LNG)));
        d.setOperatingHours(c.getString(c.getColumnIndexOrThrow(DatabaseHelper.COL_DEST_HOURS)));
        d.setNearbyTerminalId(c.getLong(c.getColumnIndexOrThrow(DatabaseHelper.COL_DEST_TERM_ID)));
        d.setNearbyTerminalName(c.getString(c.getColumnIndexOrThrow(DatabaseHelper.COL_DEST_TERM_NAME)));
        d.setSuggestedRoute(c.getString(c.getColumnIndexOrThrow(DatabaseHelper.COL_DEST_ROUTE)));
        d.setAccessibilityInfo(c.getString(c.getColumnIndexOrThrow(DatabaseHelper.COL_DEST_ACCESSIBILITY)));
        d.setImageUrl(c.getString(c.getColumnIndexOrThrow(DatabaseHelper.COL_DEST_IMAGE)));
        return d;
    }

    private ContentValues destinationToContentValues(Destination d) {
        ContentValues cv = new ContentValues();
        cv.put(DatabaseHelper.COL_DEST_NAME, d.getName());
        cv.put(DatabaseHelper.COL_DEST_DESC, d.getDescription());
        cv.put(DatabaseHelper.COL_DEST_MUNICIPALITY, d.getMunicipality());
        cv.put(DatabaseHelper.COL_DEST_PROVINCE, d.getProvince());
        cv.put(DatabaseHelper.COL_DEST_CATEGORY, d.getCategory());
        cv.put(DatabaseHelper.COL_DEST_LAT, d.getLatitude());
        cv.put(DatabaseHelper.COL_DEST_LNG, d.getLongitude());
        cv.put(DatabaseHelper.COL_DEST_HOURS, d.getOperatingHours());
        cv.put(DatabaseHelper.COL_DEST_TERM_ID, d.getNearbyTerminalId());
        cv.put(DatabaseHelper.COL_DEST_TERM_NAME, d.getNearbyTerminalName());
        cv.put(DatabaseHelper.COL_DEST_ROUTE, d.getSuggestedRoute());
        cv.put(DatabaseHelper.COL_DEST_ACCESSIBILITY, d.getAccessibilityInfo());
        cv.put(DatabaseHelper.COL_DEST_IMAGE, d.getImageUrl());
        return cv;
    }
}
