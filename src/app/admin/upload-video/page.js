'use client';

import { useState } from 'react';

export default function UploadVideo() {
  const [title, setTitle] = useState('');
  const [video, setVideo] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!video) return alert("Please select a video file");

    const formData = new FormData();
    formData.append('title', title);
    formData.append('video', video);

    const res = await fetch('/api/admin/upload-video', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    setMessage(data.message || 'Uploaded successfully!');
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Upload Video</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Video Title</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium">Select Video File</label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Upload Video
        </button>
        {message && <p className="text-green-600">{message}</p>}
      </form>
    </div>
  );
}
