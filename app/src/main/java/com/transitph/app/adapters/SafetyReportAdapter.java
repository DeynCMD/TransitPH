package com.transitph.app.adapters;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.core.content.ContextCompat;
import androidx.recyclerview.widget.RecyclerView;

import com.transitph.app.R;
import com.transitph.app.models.SafetyReport;

import java.util.ArrayList;
import java.util.List;

public class SafetyReportAdapter extends RecyclerView.Adapter<SafetyReportAdapter.ViewHolder> {
    private final Context context;
    private List<SafetyReport> reportList = new ArrayList<>();

    public SafetyReportAdapter(Context context) {
        this.context = context;
    }

    public void setReports(List<SafetyReport> list) {
        this.reportList = list != null ? list : new ArrayList<>();
        notifyDataSetChanged();
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(context).inflate(R.layout.item_safety_report, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        SafetyReport r = reportList.get(position);
        holder.tvCategory.setText("⚠️ " + r.getCategory());
        holder.tvLocation.setText("📍 " + r.getLocation());
        holder.tvDesc.setText(r.getDescription());
        holder.tvStatus.setText(r.getStatus());
        holder.tvAuthor.setText("Reported by: " + r.getUserFullName());
        holder.tvDate.setText(r.getCreatedAt());

        if ("VERIFIED".equals(r.getStatus())) {
            holder.tvStatus.setTextColor(ContextCompat.getColor(context, R.color.success));
        } else if ("RESOLVED".equals(r.getStatus())) {
            holder.tvStatus.setTextColor(ContextCompat.getColor(context, R.color.primary));
        } else {
            holder.tvStatus.setTextColor(ContextCompat.getColor(context, R.color.warning));
        }

        if (r.getAdminNotes() != null && !r.getAdminNotes().trim().isEmpty()) {
            holder.tvAdminNotes.setVisibility(View.VISIBLE);
            holder.tvAdminNotes.setText("Admin Action: " + r.getAdminNotes());
        } else {
            holder.tvAdminNotes.setVisibility(View.GONE);
        }
    }

    @Override
    public int getItemCount() {
        return reportList.size();
    }

    static class ViewHolder extends RecyclerView.ViewHolder {
        TextView tvCategory, tvLocation, tvDesc, tvStatus, tvAuthor, tvDate, tvAdminNotes;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            tvCategory = itemView.findViewById(R.id.tv_report_category);
            tvLocation = itemView.findViewById(R.id.tv_report_location);
            tvDesc = itemView.findViewById(R.id.tv_report_desc);
            tvStatus = itemView.findViewById(R.id.tv_report_status);
            tvAuthor = itemView.findViewById(R.id.tv_report_author);
            tvDate = itemView.findViewById(R.id.tv_report_date);
            tvAdminNotes = itemView.findViewById(R.id.tv_report_admin_notes);
        }
    }
}
