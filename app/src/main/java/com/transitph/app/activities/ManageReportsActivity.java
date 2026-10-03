package com.transitph.app.activities;

import android.os.Bundle;
import android.widget.ImageButton;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.transitph.app.R;
import com.transitph.app.adapters.SafetyReportAdapter;
import com.transitph.app.database.SafetyReportDao;

public class ManageReportsActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_manage_reports);

        ImageButton btnBack = findViewById(R.id.btn_back_manage_reports);
        btnBack.setOnClickListener(v -> finish());

        RecyclerView recyclerView = findViewById(R.id.recycler_manage_reports);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        SafetyReportAdapter adapter = new SafetyReportAdapter(this);
        recyclerView.setAdapter(adapter);

        SafetyReportDao dao = new SafetyReportDao(this);
        adapter.setReports(dao.getAllReports());
    }
}
