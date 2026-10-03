# Map Integration and Terminal Database Implementation

This plan outlines the integration of Google Maps into the TransitPH app to visualize the master terminal database and transit routes across CALABARZON.

## User Review Required

> [!IMPORTANT]
> **Google Maps API Key**: You will need a valid Google Maps API Key. I will use a placeholder `MAPS_API_KEY` in `local.properties` or `AndroidManifest.xml`. You must replace it with your own key for the map to function on a real device.

## Proposed Changes

### Build Configuration

#### [MODIFY] [build.gradle](file:///C:/Users/Lenovo/Downloads/TransitPH222-main/app/build.gradle)
Add `com.google.android.gms:play-services-maps` and `com.google.maps.android:android-maps-utils` dependencies.

#### [MODIFY] [AndroidManifest.xml](file:///C:/Users/Lenovo/Downloads/TransitPH222-main/app/src/main/AndroidManifest.xml)
Add required permissions (`INTERNET`, `ACCESS_FINE_LOCATION`) and the Google Maps `<meta-data>` tag.

### Data Layer

#### [MODIFY] [DatabaseHelper.java](file:///C:/Users/Lenovo/Downloads/TransitPH222-main/app/src/main/java/com/transitph/app/database/DatabaseHelper.java)
Update terminal table seeding logic to import data from the provided CSV file (`CALABARZON_Jeepney_Terminal_Master_Database_v3.csv`).

#### [MODIFY] [RouteStop.java](file:///C:/Users/Lenovo/Downloads/TransitPH222-main/app/src/main/java/com/transitph/app/models/RouteStop.java)
Add `latitude` and `longitude` fields to support exact route visualization.

### UI Components

#### [NEW] [MapActivity.java](file:///C:/Users/Lenovo/Downloads/TransitPH222-main/app/src/main/java/com/transitph/app/activities/MapActivity.java)
A new activity to display the map, markers for all terminals, and polylines for specific routes.

#### [NEW] [activity_map.xml](file:///C:/Users/Lenovo/Downloads/TransitPH222-main/app/src/main/res/layout/activity_map.xml)
Layout for the Map activity.

#### [MODIFY] [RouteDetailsActivity.java](file:///C:/Users/Lenovo/Downloads/TransitPH222-main/app/src/main/java/com/transitph/app/activities/RouteDetailsActivity.java)
Add a "View on Map" button to launch `MapActivity` with the current route highlighted.

#### [MODIFY] [TerminalsFragment.java](file:///C:/Users/Lenovo/Downloads/TransitPH222-main/app/src/main/java/com/transitph/app/fragments/TerminalsFragment.java)
Add a floating action button to view all terminals on a map.

## Verification Plan

### Automated Tests
- Build and run the project to ensure no dependency conflicts.

### Manual Verification
- Deploy to an emulator/device.
- Navigate to the Terminals tab and click "View on Map".
- Verify that markers appear for CALABARZON terminals.
- Select a route and click "View on Map" to see the terminal-to-terminal polyline.
