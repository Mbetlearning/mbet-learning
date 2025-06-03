// /app/admin/add-questions/page.js

"use client";

import React, { useState } from 'react';

export default function AddQuestionsPage() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // तुम्ही इथे API call करू शकता backend ला पाठवायला
    console.log('Submitted Question:', question);
    console.log('Submitted Answer:', answer);

    // Clear form
    setQuestion('');
    setAnswer('');
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Add Interview Question</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <div>
          <label className="block text-sm font-medium text-gray-700">Question</label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
            rows={4}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Answer</label>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
            rows={4}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
