export default function Dashboard() {
  const userRole = "student"; // Change to 'admin' to simulate admin view

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-blue-700">Dashboard</h2>

      {userRole === "admin" ? (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Admin Panel</h3>
          <ul className="list-disc list-inside">
            <li>Manage Courses</li>
            <li>View All Users</li>
            <li>Upload Content</li>
            <li>Track Progress Reports</li>
          </ul>
        </div>
      ) : (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Welcome, Student!</h3>
          <ul className="list-disc list-inside">
            <li>Continue Learning</li>
            <li>View Enrolled Courses</li>
            <li>Attempt Quizzes</li>
            <li>Download Certificates</li>
          </ul>
        </div>
      )}
    </div>
  )
}
