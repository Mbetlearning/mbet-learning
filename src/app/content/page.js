// File: app/content/page.js

'use client'

import { useEffect, useState } from "react"

export default function ContentViewer() {
  const [content, setContent] = useState({
    videoUrl: '',
    pdfUrl: ''
  });

  useEffect(() => {
    // Simulating fetch from backend API
    const fetchData = async () => {
      // Replace with actual API call
      const res = await fetch("/api/content"); // Your backend endpoint
      const data = await res.json();

      setContent({
        videoUrl: data.videoUrl,
        pdfUrl: data.pdfUrl,
      });
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 space-y-10">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 mb-4">Video Lesson</h2>
        {content.videoUrl ? (
          <video
            controls
            className="w-full max-h-[500px] rounded shadow"
            src={content.videoUrl}
          />
        ) : (
          <p>Loading video...</p>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-bold text-green-700 mb-4">PDF Material</h2>
        {content.pdfUrl ? (
          <iframe
            src={content.pdfUrl}
            className="w-full h-[500px] border rounded shadow"
            title="PDF Viewer"
          ></iframe>
        ) : (
          <p>Loading PDF...</p>
        )}
      </div>
    </div>
  );
}
