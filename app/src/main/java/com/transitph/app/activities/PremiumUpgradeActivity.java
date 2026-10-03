package com.transitph.app.activities;

import android.os.Bundle;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.transitph.app.R;
import com.transitph.app.utils.SessionManager;

public class PremiumUpgradeActivity extends AppCompatActivity {

    private SessionManager sessionManager;
    private TextView tvCurrentTier;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_premium_upgrade);

        sessionManager = new SessionManager(this);

        ImageButton btnBack = findViewById(R.id.btn_back_upgrade);
        btnBack.setOnClickListener(v -> finish());

        tvCurrentTier = findViewById(R.id.tv_current_tier);
        Button btnSubscribe = findViewById(R.id.btn_subscribe_monthly);

        boolean isPremium = sessionManager.isLoggedIn() && "PREMIUM".equalsIgnoreCase(sessionManager.getUserRole());
        updateStatusText(isPremium);

        btnSubscribe.setOnClickListener(v -> {
            Toast.makeText(this, "Success! You have been upgraded to TransitPH Premium. Enjoy unlimited route searches!", Toast.LENGTH_LONG).show();
            updateStatusText(true);
            finish();
        });
    }

    private void updateStatusText(boolean isPremium) {
        if (isPremium) {
            tvCurrentTier.setText("Current Account Status: ⭐ Active Premium Member");
        } else {
            tvCurrentTier.setText("Current Account Status: Free Tier (Active Searches remaining)");
        }
    }
}
