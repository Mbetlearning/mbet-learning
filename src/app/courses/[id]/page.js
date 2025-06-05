'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function CourseDetail() {
  const params = useParams();
  const courseId = params.id;

  const [course, setCourse] = useState(null);

  useEffect(() => {
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

      {/* Topics Section */}
      <div>
        <h2 className="text-xl font-semibold mb-2">What you’ll learn</h2>
        {Array.isArray(course.topics) && course.topics.length > 0 ? (
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            {course.topics.map((topic, idx) => (
              <li key={idx}>{topic}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No topics available.</p>
        )}
      </div>

      {/* Videos & PDFs */}
      <div>
        <h2 className="text-xl font-semibold mt-6 mb-2">Course Videos & Resources</h2>
        {Array.isArray(course.videos) && course.videos.length > 0 ? (
          course.videos.map((video, idx) => (
            <div key={idx} className="border p-4 rounded shadow space-y-3">
              <h3 className="text-lg font-medium text-purple-700">{video.title}</h3>

              <video
                src={video.videoUrl}
                controls
                className="w-full mt-2 rounded"
              />

              <iframe
                src={video.pdfUrl}
                width="100%"
                height="500"
                className="border rounded"
              ></iframe>

              <a
                href={video.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline inline-block"
              >
                📄 View Fullscreen / Download PDF
              </a>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No videos available.</p>
        )}
      </div>

      <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
        Enroll Now
      </button>
    </div>
  );
}
