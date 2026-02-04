const API_BASE = process.env.NEXT_PUBLIC_API_URL!;


export async function fetchEmployees() {
  const res = await fetch(`${API_BASE}/employees`);
  if (!res.ok) throw new Error("Failed to fetch employees");
  return res.json();
}

export async function createEmployee(data: any) {
  const res = await fetch(`${API_BASE}/employees`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.detail || "Failed to create employee");
  }

  return res.json();
}

export async function deleteEmployee(id: string) {
  const res = await fetch(`${API_BASE}/employees/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Delete failed");
}

export async function markAttendance(data: any) {
	const res = await fetch(`${API_BASE}/attendance`, {
	  method: "POST",
	  headers: { "Content-Type": "application/json" },
	  body: JSON.stringify(data),
	});

	if (!res.ok) {
	  const error = await res.json();
	  throw new Error(error.detail || "Failed to mark attendance");
	}

	return res.json();
  }

  export async function fetchAttendance(employeeId: string) {
	if (!employeeId) return [];

	const res = await fetch(`${API_BASE}/attendance/${employeeId}`);

	if (!res.ok) {
	  const error = await res.json();
	  throw new Error(error.detail || "Failed to fetch attendance");
	}

	return res.json();
  }

  export async function fetchTodaySummary() {
	const res = await fetch(`${API_BASE}/attendance/summary/today`);
	if (!res.ok) throw new Error("Failed to fetch summary");
	return res.json();
  }
