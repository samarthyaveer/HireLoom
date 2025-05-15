'use client';

import { useState } from 'react';
import Link from 'next/link';
import ResumeUploader from '../sample-qsn/components/ResumeUploader';
import InterviewQuestions from '../sample-qsn/components/InterviewQuestions';
import LoadingState from '../sample-qsn/components/LoadingState';

export default function Home() {
  const [extractedText, setExtractedText] = useState('');
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(0);

  const handleTextExtracted = async (text) => {
    setExtractedText(text);
    setLoading(true);
    setError('');
    setProgress(30);

    // Simulate progress
    setTimeout(() => {
      if (loading) setProgress(60);
    }, 1500);

    try {
      // Make API call to generate questions
      const response = await fetch('/api/generate-questions-sample', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ resumeText: text }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error || errorData.details ||
          `Failed to generate interview questions (Status: ${response.status})`
        );
      }

      const data = await response.json();

      if (!data.questions || !Array.isArray(data.questions)) {
        throw new Error('Invalid response format: questions not found in response');
      }

      setQuestions(data.questions);
      setProgress(100);
    } catch (err) {
      console.error('Error generating questions:', err);
      setError(err.message || 'Failed to generate questions. Please try again.');
      setProgress(0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full py-16 px-4 md:px-12">
      <div className="w-full bg-dark-950 backdrop-blur-sm rounded-2xl shadow-xl border border-dark-900 p-10 max-w-6xl mx-auto">
        <div className="flex items-center mb-8">
          <Link href="/" className="text-secondary-400 hover:text-white mr-3 transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <h1 className="text-2xl font-bold text-white tracking-tight">Resume-Specific Question Generator</h1>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-dark-900 rounded-full mb-10 overflow-hidden">
          <div
            className="h-full bg-primary-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mb-8 text-center">
          <p className="text-secondary-400 max-w-2xl mx-auto">
            Upload your resume to receive precisely tailored interview questions that match your unique experience and skills.
          </p>
        </div>

        {!loading && questions.length === 0 && (
          <div className="mb-8 p-6 bg-dark-900 rounded-xl border border-dark-800 shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-primary-400">How It Works</h2>
            <ol className="space-y-4">
              <li className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-900 text-primary-300 flex items-center justify-center text-sm mr-3 mt-0.5">1</span>
                <span className="text-secondary-400">Upload your resume in PDF format</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-900 text-primary-300 flex items-center justify-center text-sm mr-3 mt-0.5">2</span>
                <span className="text-secondary-400">Our intelligent system extracts and analyzes your information</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-900 text-primary-300 flex items-center justify-center text-sm mr-3 mt-0.5">3</span>
                <span className="text-secondary-400">Advanced AI identifies key skills, experience, and qualifications</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-900 text-primary-300 flex items-center justify-center text-sm mr-3 mt-0.5">4</span>
                <span className="text-secondary-400">Receive tailored interview questions specific to your background</span>
              </li>
            </ol>
          </div>
        )}

        <ResumeUploader onTextExtracted={handleTextExtracted} />

        {loading ? (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center">
              <svg className="animate-spin h-8 w-8 text-primary-500" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
            </div>
            <p className="mt-4 text-secondary-400">Analyzing your resume, please wait...</p>
          </div>
        ) : error ? (
          <div className="mt-6 p-6 bg-error-900/30 border border-error-700 rounded-lg text-error-300">
            <div className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div className="flex-1">
                <h3 className="text-error-200 font-semibold mb-2">Error Generating Questions</h3>
                <p className="mb-4">{error}</p>

                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 px-4 py-2 bg-error-700 hover:bg-error-600 text-white rounded transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        ) : questions.length > 0 ? (
          <div className="bg-dark-950 border border-dark-900 p-8 space-y-6 rounded-xl mt-8">
            <h2 className="text-xl font-bold text-white mb-4">Generated Questions</h2>
            <InterviewQuestions questions={questions} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
