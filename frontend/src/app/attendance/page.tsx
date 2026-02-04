"use client";

import { useEffect, useState } from "react";
import { fetchEmployees } from "@/lib/api";
import { markAttendance, fetchAttendance } from "@/lib/api";

export default function AttendancePage() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("PRESENT");
  const [records, setRecords] = useState<any[]>([]);

  useEffect(() => {
    loadEmployees();
  }, []);

  async function loadEmployees() {
    const data = await fetchEmployees();
    setEmployees(data);
  }

  async function handleMarkAttendance(e: React.FormEvent) {
    e.preventDefault();
    try {
      await markAttendance({
        employee_id: selectedEmployee,
        date,
        status,
      });
      alert("Attendance marked");
      loadAttendance();
    } catch (err: any) {
      alert(err.message);
    }
  }

  async function loadAttendance() {
    if (!selectedEmployee) return;
    const data = await fetchAttendance(selectedEmployee);
    setRecords(data);
  }

  useEffect(() => {
	if (selectedEmployee) {
	  loadAttendance();
	}
  }, [selectedEmployee]);


  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Attendance</h1>
	  <p className="text-gray-500 mb-8">
		Mark and track daily attendance for employees.
	  </p>

      {/* Form */}
      <form
        onSubmit={handleMarkAttendance}
        className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-10 grid grid-cols-1 md:grid-cols-3 gap-6"      >
        <select
          className="border border-gray-300 p-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          value={selectedEmployee}
          onChange={(e) => setSelectedEmployee(e.target.value)}
          required
        >
          <option value="">Select Employee</option>
          {employees.map((emp) => (
            <option key={emp.id} value={emp.employee_id}>
              {emp.full_name}
            </option>
          ))}
        </select>

        <input
          type="date"
          className="border border-gray-300 p-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <select
          className="border border-gray-300 p-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="PRESENT">Present</option>
          <option value="ABSENT">Absent</option>
        </select>

        <button
          type="submit"
          className="col-span-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200 font-medium shadow-sm"
        >
          Mark Attendance
        </button>
      </form>

      {/* Records */}
      {records.length === 0 ? (
        <p className="text-gray-500">No attendance records.</p>
      ) : (
        <table className="w-full bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm text-gray-800">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th className="p-4 text-left text-sm font-semibold uppercase tracking-wide">Date</th>
              <th className="p-4 text-left text-sm font-semibold uppercase tracking-wide">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black-100">
            {records.map((rec) => (
              <tr key={rec.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                <td className="p-4 text-sm">{rec.date}</td>
                <td className="p-4 text-sm">{rec.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
