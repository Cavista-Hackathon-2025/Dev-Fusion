"use client";

import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

// Question set with emoji options
const questions = [
  {
    id: 1,
    question: "How are you feeling emotionally today?",
    options: ["😊 Happy", "😐 Neutral", "😔 Sad", "😟 Stressed"],
  },
  {
    id: 2,
    question: "How would you rate your current stress level?",
    options: ["🧘‍♂️ Low", "⚖️ Moderate", "🚨 High", "🔥 Very High"],
  },
  {
    id: 3,
    question: "How much energy do you feel you have today?",
    options: ["⚡ High", "💡 Moderate", "💤 Low", "😴 Exhausted"],
  },
  {
    id: 4,
    question: "How satisfied are you with your work-life balance?",
    options: ["🏅 Very Satisfied", "⚖️ Neutral", "😞 Unsatisfied", "😩 Very Unsatisfied"],
  },
  {
    id: 5,
    question: "Have you felt anxious today?",
    options: ["😬 Yes", "😌 No", "🤔 Sometimes", "😌 Rarely"],
  },
  {
    id: 6,
    question: "How would you describe your mood overall?",
    options: ["🌞 Optimistic", "🕊️ Calm", "😠 Irritable", "😔 Sad"],
  },
  {
    id: 7,
    question: "How often do you feel overwhelmed by responsibilities?",
    options: ["🙌 Rarely", "🤷‍♀️ Sometimes", "😤 Often", "😫 Very Often"],
  },
  {
    id: 8,
    question: "How would you rate your physical health today?",
    options: ["🏋️‍♂️ Great", "🧘‍♀️ Good", "😌 Fair", "😷 Poor"],
  },
  {
    id: 9,
    question: "Have you been able to relax today?",
    options: ["🧘 Yes", "😟 No", "🛋️ Sometimes", "🔄 Rarely"],
  },
  {
    id: 10,
    question: "How hopeful are you feeling about the future?",
    options: ["🌟 Very Hopeful", "🌙 Somewhat Hopeful", "🌑 Not Hopeful", "❓ Uncertain"],
  },
];

const EmotionalCheckIn: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0); // Tracks the first question in the current batch
  const [responses, setResponses] = useState<{ [key: number]: string }>({}); // Stores responses

  // Handles response selection
  const handleOptionChange = (questionId: number, option: string) => {
    setResponses((prev) => ({ ...prev, [questionId]: option }));
  };

  // Navigates to the next batch of questions
  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 5); // Skip to next 5 questions
    }
  };

  // Navigates to the previous batch of questions
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 5); // Go back to previous 5 questions
    }
  };

  // Submits the responses
  const handleSubmit = () => {
    alert("Thank you for checking in! 💖");
    console.log("Responses: ", responses);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full mx-auto">
      {/* Display questions in a grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {questions.slice(currentQuestion, currentQuestion + 5).map((q) => (
          <div key={q.id} className="p-4 rounded-lg shadow-md">
            <h4 className="font-semibold text-lg mb-4">{q.question}</h4>
            <div className="grid grid-cols-2 gap-4">
              {q.options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleOptionChange(q.id, option)}
                  className={`p-3 rounded-md border-2 text-sm ${
                    responses[q.id] === option
                      ? "bg-blue-100 border-blue-400"
                      : "border-gray-300"
                  } hover:bg-blue-50 transition-all`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between items-center mt-6">
        {currentQuestion > 0 && (
          <button
            onClick={handlePrevious}
            className="text-blue-500 hover:text-blue-700"
          >
            Previous
          </button>
        )}

        {currentQuestion < questions.length - 5 ? (
          <button
            onClick={handleNext}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition"
          >
            Next <ArrowRight size={20} />
          </button>
        ) : (
          <Link href="/pages/Myprogress">
            <button
              onClick={handleSubmit}
              className="bg-green-500 text-white py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-green-600 transition"
            >
              Submit <ArrowRight size={20} />
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default EmotionalCheckIn;
