package com.transitph.app.activities;

import android.app.Dialog;
import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.transitph.app.R;
import com.transitph.app.adapters.SafetyReportAdapter;
import com.transitph.app.database.SafetyReportDao;
import com.transitph.app.models.SafetyReport;
import com.transitph.app.utils.SessionManager;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;

public class SafetyReportsActivity extends AppCompatActivity {

    private SafetyReportDao safetyReportDao;
    private SafetyReportAdapter adapter;
    private TextView tvEmpty;
    private SessionManager sessionManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_safety_reports);

        safetyReportDao = new SafetyReportDao(this);
        sessionManager = new SessionManager(this);

        ImageButton btnBack = findViewById(R.id.btn_back_safety);
        btnBack.setOnClickListener(v -> finish());

        tvEmpty = findViewById(R.id.tv_empty_reports);

        RecyclerView recyclerView = findViewById(R.id.recycler_safety_reports);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        adapter = new SafetyReportAdapter(this);
        recyclerView.setAdapter(adapter);

        Button btnOpenDialog = findViewById(R.id.btn_open_report_dialog);
        btnOpenDialog.setOnClickListener(v -> showSubmitReportDialog());

        loadReports();
    }

    private void loadReports() {
        List<SafetyReport> list = safetyReportDao.getAllReports();
        adapter.setReports(list);
        if (list.isEmpty()) {
            tvEmpty.setVisibility(View.VISIBLE);
        } else {
            tvEmpty.setVisibility(View.GONE);
        }
    }

    private void showSubmitReportDialog() {
        Dialog dialog = new Dialog(this);
        dialog.requestWindowFeature(Window.FEATURE_NO_TITLE);
        dialog.setContentView(R.layout.dialog_submit_report);
        if (dialog.getWindow() != null) {
            dialog.getWindow().setLayout(
                    (int) (getResources().getDisplayMetrics().widthPixels * 0.9),
                    android.view.ViewGroup.LayoutParams.WRAP_CONTENT
            );
        }

        Spinner spinnerCategory = dialog.findViewById(R.id.spinner_report_category);
        EditText etLocation = dialog.findViewById(R.id.et_report_location);
        EditText etDesc = dialog.findViewById(R.id.et_report_desc);
        Button btnCancel = dialog.findViewById(R.id.btn_cancel_report);
        Button btnSubmit = dialog.findViewById(R.id.btn_submit_report_dialog);

        String[] categories = {
                "Poor Lighting",
                "Unsafe Walking Area",
                "Suspicious Activity",
                "Overcharging / Fare Dispute",
                "Terminal Service Disruption",
                "Flooding / Road Blockage"
        };
        ArrayAdapter<String> spinAdapter = new ArrayAdapter<>(this, android.R.layout.simple_spinner_dropdown_item, categories);
        spinnerCategory.setAdapter(spinAdapter);

        btnCancel.setOnClickListener(v -> dialog.dismiss());

        btnSubmit.setOnClickListener(v -> {
            String location = etLocation.getText().toString().trim();
            String desc = etDesc.getText().toString().trim();
            String cat = spinnerCategory.getSelectedItem().toString();

            if (location.isEmpty()) {
                etLocation.setError("Please specify the location or landmark");
                return;
            }
            if (desc.isEmpty()) {
                etDesc.setError("Please describe the incident or advisory");
                return;
            }

            long userId = sessionManager.getUserId();
            String userName = sessionManager.getUserFullName();
            if (userName == null || userName.isEmpty()) {
                userName = "Commuter";
            }

            String timestamp = new SimpleDateFormat("yyyy-MM-dd HH:mm", Locale.getDefault()).format(new Date());

            SafetyReport report = new SafetyReport(
                    0,
                    userId,
                    userName,
                    cat,
                    location,
                    desc,
                    "PENDING_REVIEW",
                    "MEDIUM",
                    timestamp,
                    "Thank you for your report. TransitPH moderation will review and verify."
            );

            safetyReportDao.insertReport(report);
            dialog.dismiss();
            Toast.makeText(this, "Safety report submitted successfully! Thank you for keeping commuters safe.", Toast.LENGTH_LONG).show();
            loadReports();
        });

        dialog.show();
    }
}
