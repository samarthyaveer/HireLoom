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
  const [interviewId, setInterviewId] = useState('');
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
      const newInterviewId = `int_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      const interviewData = {
        ...formData,
        id: newInterviewId,
        questions: data.questions,
        createdAt: new Date().toISOString(),
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      };

      localStorage.setItem('interview_' + newInterviewId, JSON.stringify(interviewData));
      setInterviewId(newInterviewId);
      setGeneratedLink(`${window.location.origin}/interview/${newInterviewId}`);
      setProgress(100);
    } catch (error) {
      console.error('Error generating questions:', error);
      alert('Failed to generate questions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const startInterview = () => {
    router.push(`/interview/${interviewId}`);
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
          <h1 className="text-2xl font-bold text-white tracking-tight">Create New Interview</h1>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-dark-900 rounded-full mb-10 overflow-hidden">
          <div
            className="h-full bg-primary-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Form Inputs */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <label htmlFor="jobPosition" className="block text-secondary-400 font-medium mb-2 text-sm">Job Position</label>
            <input
              type="text"
              id="jobPosition"
              name="jobPosition"
              value={formData.jobPosition}
              onChange={handleInputChange}
              placeholder="e.g. Full Stack Developer"
              className="form-input w-full p-3 rounded-lg border border-dark-800 bg-dark-900 text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              required
            />
          </div>
          <div>
            <label htmlFor="interviewDuration" className="block text-secondary-400 font-medium mb-2 text-sm">Interview Duration</label>
            <select
              id="interviewDuration"
              name="interviewDuration"
              value={formData.interviewDuration}
              onChange={handleInputChange}
              className="form-select w-full p-3 rounded-lg border border-dark-800 bg-dark-900 text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
            >
              {[15, 30, 45, 60, 90].map(min => (
                <option key={min} value={min}>{min} minutes</option>
              ))}
            </select>
          </div>
        </div>

        {/* Job Description */}
        <div className="mb-8">
          <label htmlFor="jobDescription" className="block text-secondary-400 font-medium mb-2 text-sm">Job Description</label>
          <textarea
            id="jobDescription"
            name="jobDescription"
            value={formData.jobDescription}
            onChange={handleInputChange}
            placeholder="Enter detailed job description"
            className="form-textarea w-full p-4 rounded-lg border border-dark-800 bg-dark-900 text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 h-36"
            required
          ></textarea>
        </div>

        {/* Interview Type Selection */}
        <div className="mb-10">
          <label className="block text-secondary-400 font-medium mb-3 text-sm">Interview Type</label>
          <div className="flex flex-wrap gap-3">
            {interviewTypes.map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => toggleInterviewType(type.id)}
                style={{
                  padding: '0.75rem 1.25rem',
                  borderRadius: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  backgroundColor: formData.interviewTypes.includes(type.id) ? '#2F58CD' : '#121212',
                  color: formData.interviewTypes.includes(type.id) ? 'white' : '#94A3B8',
                  border: `1px solid ${formData.interviewTypes.includes(type.id) ? '#2F58CD' : '#1E293B'}`,
                  boxShadow: formData.interviewTypes.includes(type.id) ? '0 10px 15px -3px rgba(47, 88, 205, 0.2)' : 'none'
                }}
                className="interview-type-btn"
              >
                <span style={{ fontSize: '1.125rem', position: 'relative', zIndex: 10 }}>{type.icon}</span>
                <span style={{ position: 'relative', zIndex: 10 }}>{type.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Generate Questions or Display Results */}
        {!generatedLink ? (
          <button
            onClick={handleGenerateQuestions}
            disabled={loading}
            className="w-full btn-main-action"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-3">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                Generating Questions...
              </span>
            ) : (
              "Generate Questions"
            )}
          </button>
        ) : (
          <div className="bg-dark-950 border border-dark-900 p-8 space-y-8 rounded-xl">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-500/10 text-primary-500 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Interview Created Successfully!</h3>
              <p className="text-secondary-400">Your interview is ready with {formData.interviewTypes.length} question types.</p>
            </div>

            <div className="space-y-3">
              <p className="font-medium text-secondary-400 text-sm">Share this link with candidates:</p>
              <div className="flex">
                <input
                  type="text"
                  value={generatedLink}
                  readOnly
                  className="w-full p-3 rounded-l-lg border border-dark-800 bg-dark-900 font-mono text-sm text-white"
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(generatedLink);
                    alert('Link copied to clipboard!');
                  }}
                  className="bg-primary-500 text-white px-5 rounded-r-lg relative overflow-hidden group focus:outline-none"
                >
                  <span className="relative z-10">Copy</span>
                  <div className="absolute inset-0 bg-primary-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={startInterview}
                className="flex-1 btn-main-action flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                Start Interview Now
              </button>

              <button
                onClick={() => {
                  setFormData({
                    jobPosition: '',
                    jobDescription: '',
                    interviewDuration: '30',
                    interviewTypes: []
                  });
                  setGeneratedLink('');
                  setInterviewId('');
                  setProgress(0);
                }}
                className="flex-1 btn-premium"
              >
                <span className="relative z-10">Create Another Interview</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
