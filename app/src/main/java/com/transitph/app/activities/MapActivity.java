package com.transitph.app.activities;

import android.os.Bundle;
import android.preference.PreferenceManager;
import android.widget.ImageButton;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;
import com.transitph.app.R;
import com.transitph.app.database.TerminalDao;
import com.transitph.app.models.Route;
import com.transitph.app.models.RouteStop;
import com.transitph.app.models.Terminal;
import org.osmdroid.config.Configuration;
import org.osmdroid.tileprovider.tilesource.TileSourceFactory;
import org.osmdroid.util.GeoPoint;
import org.osmdroid.views.MapView;
import org.osmdroid.views.overlay.Marker;
import android.graphics.Color;
import androidx.core.content.ContextCompat;
import androidx.core.graphics.drawable.DrawableCompat;
import org.osmdroid.views.overlay.Polyline;
import java.util.ArrayList;
import java.util.List;

public class MapActivity extends AppCompatActivity {

    public static final String EXTRA_ROUTE = "extra_route";
    
    private MapView map;
    private TerminalDao terminalDao;
    private Route route;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Required for osmdroid
        Configuration.getInstance().load(this, PreferenceManager.getDefaultSharedPreferences(this));
        setContentView(R.layout.activity_map);

        terminalDao = new TerminalDao(this);
        route = (Route) getIntent().getSerializableExtra(EXTRA_ROUTE);

        map = findViewById(R.id.mapview);
        map.setTileSource(TileSourceFactory.MAPNIK);
        map.setMultiTouchControls(true);

        ImageButton btnBack = findViewById(R.id.btn_map_back);
        btnBack.setOnClickListener(v -> finish());

        TextView tvTitle = findViewById(R.id.tv_map_title);
        if (route != null) {
            tvTitle.setText("Route: " + route.getRouteName());
        }

        setupMap();
    }

    private void setupMap() {
        // Center of CALABARZON (approx Laguna area)
        GeoPoint startPoint = new GeoPoint(14.2132, 121.1648);
        map.getController().setZoom(10.0);
        map.getController().setCenter(startPoint);

        // Load all terminals
        List<Terminal> terminals = terminalDao.getAllTerminals();
        for (Terminal t : terminals) {
            if (t.getLatitude() != 0 && t.getLongitude() != 0) {
                Marker marker = new Marker(map);
                marker.setPosition(new GeoPoint(t.getLatitude(), t.getLongitude()));
                marker.setTitle(t.getTerminalName());
                marker.setSnippet(t.getCity() + ", " + t.getProvince() + "\n" + t.getRouteCount() + " Routes");
                marker.setIcon(getResources().getDrawable(android.R.drawable.ic_dialog_map));
                map.getOverlays().add(marker);
            }
        }

        // Draw specific route if provided
        if (route != null) {
            drawRoute(route);
        }

        map.invalidate();
    }

    private void drawRoute(Route r) {
        if (map != null) {
            map.getOverlays().clear();
        }
        List<GeoPoint> points = new ArrayList<>();
        
        // Find terminal location
        Terminal term = terminalDao.getTerminalById(r.getTerminalId());
        if (term != null && term.getLatitude() != 0) {
            GeoPoint startPoint = new GeoPoint(term.getLatitude(), term.getLongitude());
            points.add(startPoint);

            Marker startMarker = new Marker(map);
            startMarker.setPosition(startPoint);
            startMarker.setTitle("START: " + term.getTerminalName());
            startMarker.setAnchor(Marker.ANCHOR_CENTER, Marker.ANCHOR_BOTTOM);
            
            android.graphics.drawable.Drawable icon = ContextCompat.getDrawable(this, android.R.drawable.ic_dialog_map);
            if (icon != null) {
                icon = DrawableCompat.wrap(icon);
                DrawableCompat.setTint(icon, Color.GREEN);
                startMarker.setIcon(icon);
            }
            map.getOverlays().add(startMarker);
        }

        // Add stops if coordinates exist
        if (r.getStops() != null) {
            for (RouteStop stop : r.getStops()) {
                if (stop.getLatitude() != 0) {
                    GeoPoint stopPoint = new GeoPoint(stop.getLatitude(), stop.getLongitude());
                    points.add(stopPoint);

                    Marker stopMarker = new Marker(map);
                    stopMarker.setPosition(stopPoint);
                    stopMarker.setTitle(stop.getStopName());
                    stopMarker.setAnchor(Marker.ANCHOR_CENTER, Marker.ANCHOR_CENTER);
                    
                    android.graphics.drawable.GradientDrawable circle = new android.graphics.drawable.GradientDrawable();
                    circle.setShape(android.graphics.drawable.GradientDrawable.OVAL);
                    circle.setColor(Color.BLUE);
                    circle.setSize(24, 24);
                    circle.setBounds(0, 0, 24, 24);
                    stopMarker.setIcon(circle);

                    map.getOverlays().add(stopMarker);
                }
            }
        }

        if (points.size() >= 2) {
            Polyline line = new Polyline();
            line.setPoints(points);
            line.setColor(Color.BLUE);
            line.setWidth(8.0f);
            map.getOverlays().add(line);
            
            // Finish marker
            GeoPoint endPoint = points.get(points.size() - 1);
            Marker endMarker = new Marker(map);
            endMarker.setPosition(endPoint);
            endMarker.setTitle("FINISH");
            endMarker.setAnchor(Marker.ANCHOR_CENTER, Marker.ANCHOR_BOTTOM);
            
            android.graphics.drawable.Drawable icon = ContextCompat.getDrawable(this, android.R.drawable.ic_dialog_map);
            if (icon != null) {
                icon = DrawableCompat.wrap(icon);
                DrawableCompat.setTint(icon, Color.RED);
                endMarker.setIcon(icon);
            }
            map.getOverlays().add(endMarker);

            // Zoom to route
            map.getController().animateTo(points.get(0));
            map.getController().setZoom(13.0);
        } else if (!points.isEmpty()) {
            map.getController().animateTo(points.get(0));
            map.getController().setZoom(15.0);
        }
    }

    @Override
    public void onResume() {
        super.onResume();
        map.onResume();
    }

    @Override
    public void onPause() {
        super.onPause();
        map.onPause();
    }
}
