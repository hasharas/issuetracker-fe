export const exportToCSV = (issues) => {
      const headers = ["ID", "Title", "Status", "Priority", "Severity", "Created At"];
      const rows = issues.map((i) => [
            i._id, `"${i.title.replace(/"/g, '""')}"`,
            i.status, i.priority, i.severity,
            new Date(i.createdAt).toLocaleDateString(),
      ]);
      const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
      downloadFile(csv, "issues.csv", "text/csv");
};

export const exportToJSON = (issues) => {
      const json = JSON.stringify(issues, null, 2);
      downloadFile(json, "issues.json", "application/json");
};

const downloadFile = (content, filename, type) => {
      const blob = new Blob([content], { type });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
};