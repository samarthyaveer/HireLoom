// app/interview/[id]/page.js - Interview page for candidates
"use client";
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function InterviewPage() {
  const { id } = useParams();
  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [candidateName, setCandidateName] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [currentAnswer, setCurrentAnswer] = useState('');

  useEffect(() => {
    // Load interview data from localStorage
    const interviewData = localStorage.getItem(`interview_${id}`);
    
    if (interviewData) {
      const parsedData = JSON.parse(interviewData);
      setInterview(parsedData);
    }
    
    setLoading(false);
  }, [id]);

  const startInterview = () => {
    if (!candidateName) {
      alert('Please enter your name');
      return;
    }

    setInterviewStarted(true);
    // Initialize answers object with empty strings for each question
    if (interview && interview.questions) {
      const initialAnswers = {};
      interview.questions.forEach((_, index) => {
        initialAnswers[index] = '';
      });
      setAnswers(initialAnswers);
    }
  };

  const saveAnswer = () => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: currentAnswer
    }));
  };

  const goToNextQuestion = () => {
    saveAnswer();
    if (currentQuestionIndex < interview.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentAnswer(answers[currentQuestionIndex + 1] || '');
    }
  };

  const goToPreviousQuestion = () => {
    saveAnswer();
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setCurrentAnswer(answers[currentQuestionIndex - 1] || '');
    }
  };

  const finishInterview = () => {
    saveAnswer();
    alert('Thank you for completing the interview!');
    // Here you could save the results or send them to a server
    console.log('Interview answers:', answers);
    setInterviewStarted(false);
    setCurrentQuestionIndex(0);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading interview...</div>;
  }

  if (!interview) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Interview not found</h1>
          <p className="mt-2">This interview link is invalid or has expired.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-slate-700 rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-100">AI Interview</h1>
          <p className="mt-2 text-white">Position: {interview.jobPosition}</p>
        </div>

        {!interviewStarted ? (
          <div className="space-y-6">
            <div>
              <label htmlFor="candidateName" className="block text-sm font-medium text-gray-300">
                Your Name
              </label>
              <input
                type="text"
                id="candidateName"
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200">
              <h3 className="font-medium text-yellow-800">Before you start:</h3>
              <ul className="mt-2 text-sm text-yellow-700 list-disc list-inside">
                <li>You'll be asked {interview.questions.length} questions</li>
                <li>Take your time to provide thoughtful answers</li>
                <li>You can navigate between questions</li>
                <li>Your answers will be saved as you proceed</li>
              </ul>
            </div>

            <button
              onClick={startInterview}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none"
            >
              Start Interview
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-md border border-blue-200 mb-4">
              <h3 className="font-medium text-blue-800">Interview in progress</h3>
              <p className="text-sm text-blue-700 mt-1">
                Answer each question in the text area below. Use the navigation buttons to move between questions.
              </p>
            </div>
            
            {/* Current question display */}
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mb-4">
              <h4 className="text-sm font-medium text-gray-500 mb-2">
                Question {currentQuestionIndex + 1} of {interview.questions.length}:
              </h4>
              <p className="text-gray-800 font-medium">{interview.questions[currentQuestionIndex]}</p>
            </div>

            {/* Answer textarea */}
            <div className="space-y-2">
              <label htmlFor="answer" className="block text-sm font-medium text-gray-300">
                Your Answer:
              </label>
              <textarea
                id="answer"
                rows={6}
                value={currentAnswer}
                onChange={(e) => setCurrentAnswer(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm border p-2"
                placeholder="Type your answer here..."
              />
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between space-x-4">
              <button
                onClick={goToPreviousQuestion}
                disabled={currentQuestionIndex === 0}
                className={`flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                  ${currentQuestionIndex === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:outline-none'}`}
              >
                Previous
              </button>
              
              {currentQuestionIndex < interview.questions.length - 1 ? (
                <button
                  onClick={goToNextQuestion}
                  className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={finishInterview}
                  className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none"
                >
                  Finish
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}