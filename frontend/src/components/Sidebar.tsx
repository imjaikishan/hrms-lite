"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const linkClass = (path: string) =>
  `block px-4 py-2 rounded-lg transition ${
    pathname === path
      ? "bg-blue-600 text-white"
      : "text-gray-600 hover:bg-gray-100"
  }`;


  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 p-6">
      <div className="mb-10">
  <h2 className="text-xl font-semibold text-black">HRMS Lite</h2>
  <p className="text-xs text-gray-500 mt-1">Admin Panel</p>
</div>

      <nav className="space-y-2">
        <Link href="/" className={linkClass("/")}>
          Dashboard
        </Link>
        <Link href="/employees" className={linkClass("/employees")}>
          Employees
        </Link>
        <Link href="/attendance" className={linkClass("/attendance")}>
          Attendance
        </Link>
      </nav>
    </div>
  );
}
