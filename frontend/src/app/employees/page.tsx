"use client";

import { useEffect, useState } from "react";
import { fetchEmployees, createEmployee, deleteEmployee } from "@/lib/api";

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: "",
  });

  async function loadEmployees() {
    try {
      setLoading(true);
      const data = await fetchEmployees();
      setEmployees(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEmployees();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await createEmployee(form);
      setForm({
        employee_id: "",
        full_name: "",
        email: "",
        department: "",
      });
      loadEmployees();
    } catch (err: any) {
      alert(err.message);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure?")) return;
    await deleteEmployee(id);
    loadEmployees();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Employees</h1>
	  <p className="text-gray-500 mb-8">
		Add, manage and remove employees from the system.
	  </p>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-10 grid grid-cols-2 gap-6"
      >
        <input
          placeholder="Employee ID"
          className="border border-gray-300 p-2 rounded text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"          value={form.employee_id}
          onChange={(e) =>
            setForm({ ...form, employee_id: e.target.value })
          }
          required
        />
        <input
          placeholder="Full Name"
          className="border border-gray-300 p-2 rounded text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"          value={form.full_name}
          onChange={(e) =>
            setForm({ ...form, full_name: e.target.value })
          }
          required
        />
        <input
          placeholder="Email"
          type="email"
          className="border border-gray-300 p-2 rounded text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          required
        />
        <input
          placeholder="Department"
          className="border border-gray-300 p-2 rounded text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"          value={form.department}
          onChange={(e) =>
            setForm({ ...form, department: e.target.value })
          }
          required
        />

        <button
          type="submit"
          className="col-span-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200 font-medium shadow-sm"
        >
          Add Employee
        </button>
      </form>

      {/* Table */}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : employees.length === 0 ? (
		<div className="bg-white border border-dashed border-gray-200 p-8 rounded-2xl text-center text-gray-500">
		No employees found. Add your first employee above.
	  </div>

      ) : (
        <table className="w-full bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm text-gray-800">
          <thead className="bg-gray-50 text-gray-700 border-b border-gray-200">
            <tr>
              <th className="p-4 text-left text-sm font-semibold uppercase tracking-wide">Employee ID</th>
              <th className="p-4 text-left text-sm font-semibold uppercase tracking-wide">Name</th>
              <th className="p-4 text-left text-sm font-semibold uppercase tracking-wide">Email</th>
              <th className="p-4 text-left text-sm font-semibold uppercase tracking-wide">Department</th>
              <th className="p-4 text-left text-sm font-semibold uppercase tracking-wide">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {employees.map((emp) => (
              <tr key={emp.id} className="border-t hover:bg-gray-50 transition">
                <td key={emp.id} className=" border-gray-100 hover:bg-gray-50 transition">{emp.employee_id}</td>
                <td key={emp.id} className=" border-gray-100 hover:bg-gray-50 transition">{emp.full_name}</td>
                <td key={emp.id} className=" border-gray-100 hover:bg-gray-50 transition">{emp.email}</td>
                <td key={emp.id} className=" border-gray-100 hover:bg-gray-50 transition">{emp.department}</td>
                <td key={emp.id} className=" border-gray-100 hover:bg-gray-50 transition">
                  <button
                    onClick={() => handleDelete(emp.employee_id)}
                    className="text-red-600 hover:text-red-700 font-medium transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
