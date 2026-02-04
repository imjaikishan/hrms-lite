"use client";

import { useEffect, useState } from "react";
import { fetchTodaySummary } from "@/lib/api";

export default function DashboardPage() {
  const [summary, setSummary] = useState<any>(null);

  useEffect(() => {
    async function loadSummary() {
      const data = await fetchTodaySummary();
      setSummary(data);
    }
    loadSummary();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {!summary ? (
        <p className="text-gray-500 animate-pulse">
		Loading data...
	  </p>

      ) : (
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
            <h2 className="text-gray-500 text-sm">Total Employees</h2>
            <p className="text-3xl font-semibold mt-3">
              {summary.total_employees}
            </p>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
            <h2 className="text-gray-500 text-sm">Present Today</h2>
            <p className="text-3xl font-semibold mt-3 text-green-600">
              {summary.present_today}
            </p>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
            <h2 className="text-gray-500 text-sm">Absent Today</h2>
            <p className="text-3xl font-semibold mt-3 text-red-600">
              {summary.absent_today}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
