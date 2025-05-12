'use client';

import { useState } from 'react';
import ResumeUploader from '../sample-qsn/components/ResumeUploader';
import InterviewQuestions from '../sample-qsn/components/InterviewQuestions';
import LoadingState from '../sample-qsn/components/LoadingState';

export default function Home() {
  const [extractedText, setExtractedText] = useState('');
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTextExtracted = async (text) => {
    setExtractedText(text);
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/generate-questions-sample', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ resumeText: text }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate interview questions');
      }
      
      const data = await response.json();
      setQuestions(data.questions);
    } catch (err) {
      console.error('Error generating questions:', err);
      setError('Failed to generate questions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8 bg-slate-800">
      <header className="text-center mb-12">
        <div className="inline-block mb-6 p-2 bg-purple-500/10 rounded-full">
        </div>
        <h1 className="text-4xl font-bold mb-2 text-white">Sample Interview Qsn Generator</h1>
        <p className="text-gray-400 max-w-lg mx-auto">
          Upload your resume and get AI-generated interview questions tailored to your experience and skills.
        </p>
      </header>
      
      <div className="max-w-3xl mx-auto">
        {!loading && questions.length === 0 && (
          <div className="mb-8 p-6 bg-gray-800/50 rounded-xl border border-gray-700 shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-purple-300">How It Works</h2>
            <ol className="space-y-3">
              <li className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-900 text-purple-300 flex items-center justify-center text-sm mr-3 mt-0.5">1</span>
                <span>Upload your resume in PDF format</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-900 text-purple-300 flex items-center justify-center text-sm mr-3 mt-0.5">2</span>
                <span>Our system extracts the text from your resume</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-900 text-purple-300 flex items-center justify-center text-sm mr-3 mt-0.5">3</span>
                <span>Gemini AI analyzes your experience and skills</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-900 text-purple-300 flex items-center justify-center text-sm mr-3 mt-0.5">4</span>
                <span>Get personalized interview questions to practice with</span>
              </li>
            </ol>
          </div>
        )}
        
        <ResumeUploader onTextExtracted={handleTextExtracted} />
        
        {loading ? (
          <LoadingState />
        ) : error ? (
          <div className="mt-6 p-4 bg-red-900/30 border border-red-700 rounded-lg text-red-300">
            <div className="flex items-center">
              {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg> */}
              {error}
            </div>
          </div>
        ) : questions.length > 0 ? (
          <InterviewQuestions questions={questions} />
        ) : null}
      </div>
    </main>
  );
}
