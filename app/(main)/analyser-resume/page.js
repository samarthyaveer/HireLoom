'use client';

import { useState } from 'react';
import Link from 'next/link';
import UploadForm from '../analyser-resume/components/UploadForm';
import ResultsTable from '../analyser-resume/components/ResultsTable';

export default function Home() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(0);

  const handleAnalysisComplete = (analysisResults) => {
    setResults(analysisResults);
    setIsLoading(false);
    setProgress(100);
  };

  const handleAnalysisStart = () => {
    setIsLoading(true);
    setProgress(30);

    // Simulate progress
    setTimeout(() => {
      if (isLoading) setProgress(60);
    }, 1500);
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
          <h1 className="text-2xl font-bold text-white tracking-tight">Resume Analysis Tool</h1>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-dark-900 rounded-full mb-10 overflow-hidden">
          <div
            className="h-full bg-primary-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mb-8">
          <UploadForm
            onAnalysisStart={handleAnalysisStart}
            onAnalysisComplete={handleAnalysisComplete}
            onError={(msg) => {
              setError(msg);
              setIsLoading(false);
              setProgress(0);
            }}
          />
        </div>

        {isLoading && (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center">
              <svg className="animate-spin h-8 w-8 text-primary-500" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
            </div>
            <p className="mt-4 text-secondary-400">Analyzing resumes, please wait...</p>
          </div>
        )}

        {error && (
          <div className="mt-6 p-4 bg-error-900/30 border border-error-700 rounded-lg text-error-300">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          </div>
        )}

        {results.length > 0 && (
          <div className="bg-dark-950 border border-dark-900 p-8 space-y-6 rounded-xl">
            <h2 className="text-xl font-bold text-white mb-4">Analysis Results</h2>
            <ResultsTable results={results} />
          </div>
        )}
      </div>
    </div>
  );
}
