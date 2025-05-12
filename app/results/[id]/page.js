// app/results/[id]/page.js
"use client";
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export default function InterviewResults() {
  const { id } = useParams();
  const router = useRouter();
  const [interview, setInterview] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [overallScore, setOverallScore] = useState(0);
  const [candidateName, setCandidateName] = useState('');
  const [scoreData, setScoreData] = useState([]);

  useEffect(() => {
    // Load interview data and results from localStorage
    const interviewData = localStorage.getItem('interview_' + id);
    const resultsData = localStorage.getItem('interview_results_' + id);
    
    if (interviewData && resultsData) {
      const parsedInterview = JSON.parse(interviewData);
      const parsedResults = JSON.parse(resultsData);
      
      setInterview(parsedInterview);
      setResults(parsedResults);
      
      // Set candidate name from results
      setCandidateName(parsedResults.candidateName || 'Unnamed Candidate');
      
      // Calculate score
      calculateScore(parsedResults);
    } else {
      alert('Interview or results not found');
      router.push('/interviews');
    }
    
    setLoading(false);
  }, [id, router]);
  
  // Function to calculate score based on answers
  const calculateScore = (results) => {
    if (!results || !results.answers || !results.answers.length) return;
    
    // Calculate a score for each question
    const questionScores = results.answers.map(answer => {
      // If there's a formal scoring system in results, use it
      if (results.questionScores && results.questionScores.length) {
        return results.questionScores;
      }
      
      // Otherwise perform a basic scoring based on answer length, completeness
      if (!answer) return 0;
      
      // Basic scoring: 
      // - Length: answers between 50-300 chars get higher scores
      // - Keywords: check for technical terms (simplified example)
      const length = answer.length;
      let score = 0;
      
      // Length-based scoring
      if (length > 0 && length < 20) score = 40;
      else if (length >= 20 && length < 50) score = 60;
      else if (length >= 60 && length < 80) score = 70;
      else if (length >= 300) score = 70; // Penalize slightly for verbosity
      
      // Add some variation
      score += Math.floor(Math.random() * 20); // Add some randomness for demo
      
      // Cap at 100
      return Math.min(score, 100);
    });
    
    // Calculate overall score
    const total = questionScores.reduce((sum, score) => sum + score, 0);
    const overall = Math.round(total / questionScores.length);
    
    setOverallScore(overall);
    
    // Prepare data for chart
    const passed = overall >= 70 ? 1 : 0;
    const chartData = [
      { name: 'Score', value: overall },
      { name: 'Remaining', value: 100 - overall }
    ];
    setScoreData(chartData);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  if (!interview || !results) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">Results Not Found</h1>
        <p className="mb-6">The interview results you're looking for may have been deleted.</p>
        <Link href="/interviews" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          View All Interviews
        </Link>
      </div>
    );
  }

  const completedDate = new Date(results.completedAt);
  const scoreColor = overallScore >= 80 ? 'green' : overallScore >= 70 ? 'blue' : 'red';
  const COLORS = ['#0088FE', '#BBBBBB'];

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center mb-6">
          <Link href="/interviews" className="text-gray-500 mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Interview Results</h1>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
            <div className="flex flex-wrap justify-between items-start">
              <div>
                <h2 className="text-lg font-medium text-gray-800">{interview.jobPosition} Interview</h2>
                <p className="text-md font-medium text-gray-700 mt-1">Candidate: {candidateName}</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {interview.interviewTypes && interview.interviewTypes.map((type) => (
                    <span 
                      key={type} 
                      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </span>
                  ))}
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                    {interview.interviewDuration} min
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Completed: {completedDate.toLocaleDateString()} {completedDate.toLocaleTimeString()}
                </p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className={`text-${scoreColor}-600 text-3xl font-bold`}>
                  {overallScore}/100
                </div>
                <div className="text-gray-500 text-sm">
                  Overall Score
                </div>
              </div>
            </div>
          </div>
          
          {/* Score visualization */}
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-medium text-gray-800 mb-4">Performance Summary</h3>
            <div className="flex flex-wrap items-center">
              <div className="w-full sm:w-1/2">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={scoreData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {scoreData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-full sm:w-1/2 p-4">
                <div className="mb-2">
                  <div className="text-gray-700 font-medium">Assessment:</div>
                  <div className={`text-${scoreColor}-600 font-medium`}>
                    {overallScore >= 80 ? 'Excellent' : 
                     overallScore >= 70 ? 'Good' : 
                     overallScore >= 60 ? 'Average' : 'Needs Improvement'}
                  </div>
                </div>
                <div className="mb-2">
                  <div className="text-gray-700 font-medium">Strengths:</div>
                  <div className="text-gray-600">
                    {overallScore >= 70 ? 
                      'Clear communication, technical knowledge' : 
                      'Showed effort in responses'}
                  </div>
                </div>
                <div>
                  <div className="text-gray-700 font-medium">Areas for improvement:</div>
                  <div className="text-gray-600">
                    {overallScore >= 80 ? 'Continue to develop deeper expertise' : 
                     'More detailed responses, technical precision'}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="px-6 py-4">
            <h3 className="font-medium text-gray-800 mb-4">Question & Answer Review</h3>
            <div className="space-y-6">
              {interview.questions.map((question, index) => (
                <div key={index} className="border border-gray-200 rounded-md overflow-hidden">
                  <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="font-medium text-gray-800">Question {index + 1}</h3>
                    {results.questionScores && (
                      <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-${
                        results.questionScores[index] >= 80 ? 'green' : 
                        results.questionScores[index] >= 70 ? 'blue' : 'red'
                      }-100 text-${
                        results.questionScores[index] >= 80 ? 'green' : 
                        results.questionScores[index] >= 70 ? 'blue' : 'red'
                      }-800`}>
                        Score: {results.questionScores ? results.questionScores[index] : '?'}/100
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="mb-3 font-medium">{question}</p>
                    <div className="mt-2 bg-gray-50 p-3 rounded-md">
                      <p className="text-gray-800 whitespace-pre-wrap">{results.answers[index] || "(No answer provided)"}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex gap-3 justify-end">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Print Results
          </button>
          <Link 
            href="/interviews"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Back to Interviews
          </Link>
        </div>
      </div>
    </div>
  );
}