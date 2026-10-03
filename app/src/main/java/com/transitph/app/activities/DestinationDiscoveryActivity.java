package com.transitph.app.activities;

import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.ContextCompat;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.transitph.app.R;
import com.transitph.app.adapters.DestinationAdapter;
import com.transitph.app.database.DestinationDao;
import com.transitph.app.models.Destination;

import java.util.List;

public class DestinationDiscoveryActivity extends AppCompatActivity {

    private DestinationDao destinationDao;
    private DestinationAdapter adapter;
    private EditText etSearch;
    private TextView tvEmpty;
    private Button chipAll, chipTourist, chipSchools, chipShopping;
    private String selectedCategory = "ALL";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_destination_discovery);

        destinationDao = new DestinationDao(this);

        ImageButton btnBack = findViewById(R.id.btn_back);
        btnBack.setOnClickListener(v -> finish());

        etSearch = findViewById(R.id.et_search_destination);
        tvEmpty = findViewById(R.id.tv_empty_destinations);

        RecyclerView recyclerView = findViewById(R.id.recycler_destinations);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        adapter = new DestinationAdapter(this);
        recyclerView.setAdapter(adapter);

        chipAll = findViewById(R.id.chip_all);
        chipTourist = findViewById(R.id.chip_tourist);
        chipSchools = findViewById(R.id.chip_schools);
        chipShopping = findViewById(R.id.chip_shopping);

        setupChips();
        setupSearch();
        loadDestinations();
    }

    private void setupChips() {
        chipAll.setOnClickListener(v -> selectCategory("ALL", chipAll));
        chipTourist.setOnClickListener(v -> selectCategory("Tourist Attraction", chipTourist));
        chipSchools.setOnClickListener(v -> selectCategory("School/University", chipSchools));
        chipShopping.setOnClickListener(v -> selectCategory("Shopping", chipShopping));
    }

    private void selectCategory(String category, Button selectedButton) {
        this.selectedCategory = category;
        resetChipStyles();
        selectedButton.setBackgroundTintList(ContextCompat.getColorStateList(this, R.color.primary));
        selectedButton.setTextColor(ContextCompat.getColor(this, R.color.surface));
        loadDestinations();
    }

    private void resetChipStyles() {
        Button[] buttons = {chipAll, chipTourist, chipSchools, chipShopping};
        for (Button btn : buttons) {
            btn.setBackgroundTintList(ContextCompat.getColorStateList(this, R.color.border));
            btn.setTextColor(ContextCompat.getColor(this, R.color.text_primary));
        }
    }

    private void setupSearch() {
        etSearch.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {}

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {
                loadDestinations();
            }

            @Override
            public void afterTextChanged(Editable s) {}
        });
    }

    private void loadDestinations() {
        String query = etSearch.getText().toString().trim();
        List<Destination> list;

        if (!query.isEmpty()) {
            list = destinationDao.searchDestinations(query);
        } else if (!"ALL".equals(selectedCategory)) {
            list = destinationDao.getDestinationsByCategory(selectedCategory);
        } else {
            list = destinationDao.getAllDestinations();
        }

        adapter.setDestinations(list);
        if (list.isEmpty()) {
            tvEmpty.setVisibility(View.VISIBLE);
        } else {
            tvEmpty.setVisibility(View.GONE);
        }
    }
}
