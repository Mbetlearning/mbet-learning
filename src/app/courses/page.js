'use client';
import Link from 'next/link';

const courses = [
  {
    id: "web-development",
    title: "Full Stack Web Development",
    description: "Learn HTML, CSS, JavaScript, React, Node.js, MongoDB",
  },
  {
    id: "python-development",
    title: "Python for Beginners",
    description: "Basics of Python, loops, functions, file handling",
  },
  {
    id: "java-development",
    title: "Data Structures & Algorithms",
    description: "Master sorting, searching, recursion, and dynamic programming",
  },
];

export default function CourseCatalog() {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-purple-700">Course Catalog</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="p-4 border rounded shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-gray-800">{course.title}</h3>
            <p className="text-gray-600 mt-2">{course.description}</p>
            <Link href={`/courses/${course.id}`}>
              <button className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
