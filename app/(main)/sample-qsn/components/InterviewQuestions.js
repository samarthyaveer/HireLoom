// components/InterviewQuestions.js
'use client';

import { useState } from 'react';

export default function InterviewQuestions({ questions }) {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <span className="bg-primary-900/50 text-primary-300 text-xs font-medium px-3 py-1.5 rounded-lg">
          {questions.length} questions
        </span>
      </div>

      <div className="space-y-4">
        {questions.map((question, index) => (
          <div
            key={index}
            className={`rounded-xl border transition-all duration-300 ${
              expandedIndex === index
                ? 'border-primary-500 bg-dark-900 shadow-lg shadow-primary-900/10'
                : 'border-dark-800 bg-dark-900/50 hover:border-dark-700'
            }`}
          >
            <div
              className="p-5 flex items-start cursor-pointer"
              onClick={() => toggleExpand(index)}
            >
              <div className="flex-shrink-0 bg-gradient-to-br from-primary-500 to-primary-700 text-white rounded-lg w-8 h-8 flex items-center justify-center mr-4 mt-0.5 shadow-lg shadow-primary-900/20">
                <span className="text-sm font-medium">{index + 1}</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-white">{question.question || question}</h3>
                {expandedIndex === index && question.followUp && (
                  <div className="mt-4 bg-dark-800/50 p-4 rounded-lg border border-dark-700">
                    <p className="text-secondary-400 text-sm">
                      <span className="font-medium text-primary-400">Follow-up: </span>
                      {question.followUp}
                    </p>
                  </div>
                )}
                {expandedIndex !== index && question.followUp && (
                  <p className="mt-1 text-secondary-400 text-sm">Click to see follow-up prompt</p>
                )}
              </div>
              <div className="ml-2 flex-shrink-0 text-secondary-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 transition-transform duration-300 ${expandedIndex === index ? 'transform rotate-180' : ''}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={() => window.print()}
          className="btn-premium inline-flex items-center px-5 py-2.5 text-sm"
        >
          <span className="relative z-10 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print Questions
          </span>
        </button>
      </div>
    </div>
  );
}