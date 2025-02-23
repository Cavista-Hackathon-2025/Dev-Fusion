"use client"
import React, { useState } from "react";
import Link from "next/link";

const TherapistQuestions: React.FC = () => {
  const questions = [
    "How are you feeling today?",
    "What brings you here today?",
    "Have you had any prior experience with therapy?",
    "Is there a specific goal you’d like to achieve in this session?",
    "Are there particular topics you’d prefer to avoid discussing today?",
    "How would you describe your current mental and emotional state?",
    "What do you feel is working well for you right now?",
    "Are there any recent life events that you'd like to talk about?",
    "How do you typically cope with stress or challenging situations?",
    "What kind of support are you hoping to receive?",
  ];

  const [responses, setResponses] = useState<string[]>(
    Array(questions.length).fill("")
  );

  const handleInputChange = (index: number, value: string) => {
    const updatedResponses = [...responses];
    updatedResponses[index] = value;
    setResponses(updatedResponses);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Session Questions</h1>
        <p className="text-gray-600 mb-6">
          Please take a moment to reflect on the following questions before we begin:
        </p>
        <form className="space-y-6">
          {questions.map((question, index) => (
            <div key={index}>
              <label
                htmlFor={`question-${index}`}
                className="block text-gray-700 font-medium"
              >
                {index + 1}. {question}
              </label>
              <textarea
                id={`question-${index}`}
                rows={3}
                className="mt-2 w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
                placeholder="Your response..."
                value={responses[index]}
                onChange={(e) => handleInputChange(index, e.target.value)}
              ></textarea>
            </div>
          ))}
        </form>
        <div className="mt-8">
          <Link
            href={{
              pathname: "/pages/Messages",
              query: { responses: JSON.stringify(responses) },  
            }}
          >
            <p className="block w-full bg-blue-600 text-center text-white py-2 px-4 rounded-md shadow hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Proceed to Messaging
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TherapistQuestions;
