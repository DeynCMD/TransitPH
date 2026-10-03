package com.transitph.app.activities;

import android.os.Bundle;
import android.widget.ImageButton;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.transitph.app.R;
import com.transitph.app.adapters.DestinationAdapter;
import com.transitph.app.database.DestinationDao;

public class ManageDestinationsActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_manage_destinations);

        ImageButton btnBack = findViewById(R.id.btn_back_manage_dest);
        btnBack.setOnClickListener(v -> finish());

        RecyclerView recyclerView = findViewById(R.id.recycler_manage_destinations);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        DestinationAdapter adapter = new DestinationAdapter(this);
        recyclerView.setAdapter(adapter);

        DestinationDao dao = new DestinationDao(this);
        adapter.setDestinations(dao.getAllDestinations());
    }
}
