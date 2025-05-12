// app/create-interview/page.js
"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CreateInterview() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    jobPosition: '',
    jobDescription: '',
    interviewDuration: '30',
    interviewTypes: []
  });
  const [loading, setLoading] = useState(false);
  const [generatedLink, setGeneratedLink] = useState('');
  const [progress, setProgress] = useState(0);

  const interviewTypes = [
    { id: 'technical', label: 'Technical', icon: '🖥️' },
    { id: 'behavioral', label: 'Behavioral', icon: '🧠' },
    { id: 'experience', label: 'Experience', icon: '📋' },
    { id: 'problemSolving', label: 'Problem Solving', icon: '🧩' },
    { id: 'leadership', label: 'Leadership', icon: '👑' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const toggleInterviewType = (type) => {
    setFormData(prev => {
      const types = [...prev.interviewTypes];
      return {
        ...prev,
        interviewTypes: types.includes(type)
          ? types.filter(t => t !== type)
          : [...types, type]
      };
    });
  };

  const handleGenerateQuestions = async () => {
    if (!formData.jobPosition || !formData.jobDescription || formData.interviewTypes.length === 0) {
      alert('Please fill out all required fields and select at least one interview type');
      return;
    }

    setLoading(true);
    setProgress(10);

    try {
      setProgress(30);
      const response = await fetch('/api/generate-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobPosition: formData.jobPosition,
          jobDescription: formData.jobDescription,
          interviewTypes: formData.interviewTypes,
          duration: formData.interviewDuration
        }),
      });

      setProgress(70);

      if (!response.ok) throw new Error('Failed to generate questions');
      const data = await response.json();
      const interviewId = `int_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      const interviewData = {
        ...formData,
        id: interviewId,
        questions: data.questions,
        createdAt: new Date().toISOString(),
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      };

      localStorage.setItem('interview_' + interviewId, JSON.stringify(interviewData));
      setGeneratedLink(`${window.location.origin}/interview/${interviewId}`);
      setProgress(100);
    } catch (error) {
      console.error('Error generating questions:', error);
      alert('Failed to generate questions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-black py-10 px-4 md:px-12">
      <div className="w-full bg-slate-900 rounded-2xl shadow-xl p-8 max-w-6xl mx-auto">
        <div className="flex items-center mb-6">
          <Link href="/" className="text-gray-400 hover:text-white mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          </Link>
          <h1 className="text-2xl font-bold text-white">Create New Interview</h1>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-gray-700 rounded-full mb-6">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Form Inputs */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="jobPosition" className="block text-white font-medium mb-2">Job Position</label>
            <input
              type="text"
              id="jobPosition"
              name="jobPosition"
              value={formData.jobPosition}
              onChange={handleInputChange}
              placeholder="e.g. Full Stack Developer"
              className="w-full p-3 rounded-lg border border-gray-400 bg-slate-800 text-white focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="interviewDuration" className="block text-white font-medium mb-2">Interview Duration</label>
            <select
              id="interviewDuration"
              name="interviewDuration"
              value={formData.interviewDuration}
              onChange={handleInputChange}
              className="w-full p-3 rounded-lg border border-gray-400 bg-slate-800 text-white focus:ring-2 focus:ring-blue-500"
            >
              {[15, 30, 45, 60, 90].map(min => (
                <option key={min} value={min}>{min} minutes</option>
              ))}
            </select>
          </div>
        </div>

        {/* Job Description */}
        <div className="mb-6">
          <label htmlFor="jobDescription" className="block text-white font-medium mb-2">Job Description</label>
          <textarea
            id="jobDescription"
            name="jobDescription"
            value={formData.jobDescription}
            onChange={handleInputChange}
            placeholder="Enter detailed job description"
            className="w-full p-3 rounded-lg border border-gray-400 bg-slate-800 text-white focus:ring-2 focus:ring-blue-500 h-32"
            required
          ></textarea>
        </div>

        {/* Interview Type Selection */}
        <div className="mb-8">
          <label className="block text-white font-medium mb-2">Interview Type</label>
          <div className="flex flex-wrap gap-3">
            {interviewTypes.map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => toggleInterviewType(type.id)}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition ${
                  formData.interviewTypes.includes(type.id)
                    ? 'bg-blue-500 text-white border border-blue-700'
                    : 'bg-gray-700 text-white border border-gray-500 hover:bg-gray-600'
                }`}
              >
                <span>{type.icon}</span>
                <span>{type.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Generate or Display Link */}
        {!generatedLink ? (
          <button
            onClick={handleGenerateQuestions}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                Generating Questions...
              </span>
            ) : (
              "Generate Question"
            )}
          </button>
        ) : (
          <div className="bg-green-100 border border-green-300 p-4 rounded-lg text-green-800 space-y-4">
            <div>
              <strong>Interview Created Successfully!</strong>
              <p>Share this link with your candidate:</p>
            </div>
            <div className="flex">
              <input
                type="text"
                value={generatedLink}
                readOnly
                className="w-full p-2 rounded-l-md border border-gray-300 bg-white"
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(generatedLink);
                  alert('Link copied to clipboard!');
                }}
                className="bg-blue-600 text-white px-4 rounded-r-md hover:bg-blue-700"
              >
                Copy
              </button>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => router.push('/interviews')}
                className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-800"
              >
                View All Interviews
              </button>
              <Link
                href="/"
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                Create Another
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
