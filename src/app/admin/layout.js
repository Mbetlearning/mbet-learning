'use client';

import React from 'react';
import Link from 'next/link';

export default function AdminLayout({ children }) {
  const handleLogout = () => {
    // Clear admin cookie and redirect to login
    document.cookie = "adminAuth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    window.location.href = "/admin/adminlogin";
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="space-y-4">
          <Link href="/admin/dashboard" className="block text-gray-700 hover:text-blue-600">
            Dashboard
          </Link>
          <Link href="/admin/upload-video" className="block text-gray-700 hover:text-blue-600">
            Upload Video
          </Link>
          <Link href="/admin/upload-notes" className="block text-gray-700 hover:text-blue-600">
            Upload Notes
          </Link>
          <Link href="/admin/add-questions" className="block text-gray-700 hover:text-blue-600">
            Add Questions
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Navbar */}
        <header className="mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Welcome, Admin</h1>
            <button
              onClick={handleLogout}
              className="text-red-600 hover:underline"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Page Content */}
        {children}
      </main>
    </div>
  );
}
