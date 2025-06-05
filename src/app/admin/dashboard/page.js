'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();
  const [admin, setAdmin] = useState(false);

 useEffect(() => {
  const checkAuth = async () => {
    const res = await fetch('/api/admin/check', {
      method: 'GET',
      credentials: 'include',
    });
    const data = await res.json();

    if (!data.isAdmin) {
      router.push('/admin/adminlogin');
    } else {
      setAdmin(true);
    }
  };
  checkAuth();
}, [router]);



  if (!admin) return null;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard title="Upload Videos" link="/admin/upload-video" />
        <DashboardCard title="Upload Notes (PDF)" link="/admin/upload-notes" />
        <DashboardCard title="Add Interview Questions" link="/admin/add-questions" />
        <DashboardCard title="Manage Courses" link="/admin/manage-courses" />
        <DashboardCard title="View Submissions" link="/admin/submissions" />
        <DashboardCard title="Issue Certificates" link="/admin/certificates" />
      </div>
    </div>
  );
}

function DashboardCard({ title, link }) {
  return (
    <div
      className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg cursor-pointer border border-gray-200 hover:border-blue-500 transition"
      onClick={() => window.location.href = link}
    >
      <h2 className="text-xl font-semibold text-blue-700 mb-2">{title}</h2>
      <p className="text-gray-600">Go to {title}</p>
    </div>
  );
}
<button
  onClick={() => {
    document.cookie = "adminAuth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

    router.push('/admin/adminlogin');
  }}
  className="mt-6 bg-red-500 text-white px-4 py-2 rounded"
>
  Logout
</button>

