'use client';

import { useState } from 'react';
import UploadForm from '../analyser-resume/components/UploadForm';
import ResultsTable from '../analyser-resume/components/ResultsTable';

export default function Home() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalysisComplete = (analysisResults) => {
    setResults(analysisResults);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-blue-800 container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-white">Resume Analysis Tool</h1>

      <div className="mb-8">
        <UploadForm
          onAnalysisStart={() => setIsLoading(true)}
          onAnalysisComplete={handleAnalysisComplete}
          onError={(msg) => {
            setError(msg);
            setIsLoading(false);
          }}
        />
      </div>

      {isLoading && (
        <div className="text-center py-8">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-white border-r-transparent" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <p className="mt-2 text-gray-300">Analyzing resumes, please wait...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-800 border border-red-600 text-red-100 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {results.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Analysis Results</h2>
          <ResultsTable results={results} />
        </div>
      )}
    </div>
  );
}
