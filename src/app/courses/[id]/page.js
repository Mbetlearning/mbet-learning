'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

export default function CourseDetail() {
  const params = useParams();
  const courseId = params.id;

  const [course, setCourse] = useState(null);

  useEffect(() => {
    // Simulated API call - replace with your real API
    async function fetchCourse() {
      const res = await fetch(`/api/courses/${courseId}`);
      const data = await res.json();
      setCourse(data);
    }

    fetchCourse();
  }, [courseId]);

  if (!course) {
    return <div className="p-8 text-gray-600">Loading course...</div>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-blue-700">{course.title}</h1>
      <p className="text-gray-700 text-lg">{course.description}</p>

      <div className="text-sm text-gray-500">
        <p><strong>Instructor:</strong> {course.instructor}</p>
        <p><strong>Duration:</strong> {course.duration} hours</p>
        <p><strong>Level:</strong> {course.level}</p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">What you’ll learn</h2>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          {course.topics.map((topic, idx) => (
            <li key={idx}>{topic}</li>
          ))}
        </ul>
      </div>

      <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
        Enroll Now
      </button>
    </div>
  );
}
