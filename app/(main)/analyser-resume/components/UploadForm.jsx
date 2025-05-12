'use client';

import { useState } from 'react';

export default function UploadForm({ onAnalysisStart, onAnalysisComplete, onError }) {
  const [resumes, setResumes] = useState([]);
  const [jobDescText, setJobDescText] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [analysisFactors, setAnalysisFactors] = useState({
    skills: true,
    experience: true,
    education: true,
    projects: true,
    certifications: true,
    resumeQuality: true
  });

  // Predefined job roles for dropdown
  const jobRoles = [
    'Software Engineer',
    'Full-Stack Developer',
    'Product Manager',
    'UX Designer',
    'Marketing Specialist',
    'Financial Analyst',
    'Data Scientist',
    'Sales Representative',
    'Project Manager',
    'Operations Manager'
  ];

  // Analysis factors options
  const factorOptions = [
    { id: 'skills', label: 'Technical Skills' },
    { id: 'experience', label: 'Work Experience' },
    { id: 'education', label: 'Education' },
    { id: 'projects', label: 'Projects' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'resumeQuality', label: 'Resume Quality' }
  ];

  const handleResumeChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 10) {
      onError('Maximum 10 resumes allowed');
      e.target.value = null;
      return;
    }

    const validFiles = files.filter(file => file.type === 'application/pdf');
    if (validFiles.length !== files.length) {
      onError('Only PDF files are allowed for resumes');
    }

    setResumes(validFiles);
  };

  const handleFactorChange = (factorId) => {
    setAnalysisFactors(prev => ({
      ...prev,
      [factorId]: !prev[factorId]
    }));
  };

  const selectAllFactors = () => {
    const allSelected = {};
    factorOptions.forEach(factor => {
      allSelected[factor.id] = true;
    });
    setAnalysisFactors(allSelected);
  };

  const clearAllFactors = () => {
    const allCleared = {};
    factorOptions.forEach(factor => {
      allCleared[factor.id] = false;
    });
    setAnalysisFactors(allCleared);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (resumes.length === 0) return onError('Please upload at least one resume');
    if (!jobDescText.trim()) return onError('Please enter a job description');
    if (!jobTitle.trim()) return onError('Please select a job title');
    
    // Check if at least one analysis factor is selected
    if (!Object.values(analysisFactors).some(value => value)) {
      return onError('Please select at least one analysis factor');
    }

    onAnalysisStart();

    const formData = new FormData();
    resumes.forEach((resume, index) => {
      formData.append(`resume${index + 1}`, resume);
    });
    formData.append('jobDescText', jobDescText);
    formData.append('jobTitle', jobTitle);
    formData.append('analysisFactors', JSON.stringify(analysisFactors));

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Analysis failed');
      const data = await response.json();
      onAnalysisComplete(data.results);
      setUploadProgress(0);
    } catch (error) {
      onError(`Error during analysis: ${error.message}`);
      setUploadProgress(0);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-md text-white">
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Job Title</label>
        <select
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-900 text-white focus:outline-none focus:shadow-outline"
          required
        >
          <option value="">Select a job title</option>
          {jobRoles.map((role, index) => (
            <option key={index} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Enter Job Description</label>
        <textarea
          value={jobDescText}
          onChange={(e) => setJobDescText(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-900 text-white focus:outline-none focus:shadow-outline"
          placeholder="Paste or type the job description here"
          rows="6"
          required
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-bold mb-2">Upload Resumes (Maximum 10 PDFs)</label>
        <input
          type="file"
          onChange={handleResumeChange}
          className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-900 file:text-blue-300 hover:file:bg-blue-800"
          accept=".pdf"
          multiple
          required
        />
        <p className="text-sm text-gray-400 mt-1">Selected files: {resumes.length}</p>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-bold">Analysis Criteria</label>
          <div className="space-x-2">
            <button 
              type="button" 
              onClick={selectAllFactors}
              className="px-2 py-1 text-xs bg-blue-600 hover:bg-blue-700 rounded"
            >
              Select All
            </button>
            <button 
              type="button" 
              onClick={clearAllFactors}
              className="px-2 py-1 text-xs bg-gray-600 hover:bg-gray-700 rounded"
            >
              Clear All
            </button>
          </div>
        </div>
        <div className="bg-gray-900 p-3 rounded grid grid-cols-2 md:grid-cols-3 gap-3">
          {factorOptions.map((factor) => (
            <div key={factor.id} className="flex items-center">
              <input
                id={factor.id}
                type="checkbox"
                checked={analysisFactors[factor.id]}
                onChange={() => handleFactorChange(factor.id)}
                className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-600"
              />
              <label htmlFor={factor.id} className="ml-2 text-sm font-medium text-gray-300">
                {factor.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      {uploadProgress > 0 && (
        <div className="mb-4">
          <div className="w-full bg-gray-600 rounded-full h-2.5">
            <div
              className="bg-blue-500 h-2.5 rounded-full"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <p className="text-xs text-center mt-1 text-gray-300">{uploadProgress}% uploaded</p>
        </div>
      )}

      <div className="flex items-center justify-center">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
        >
          Analyze Resumes
        </button>
      </div>
    </form>
  );
}