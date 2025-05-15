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
    <form onSubmit={handleSubmit} className="bg-dark-950 border border-dark-900 p-8 rounded-xl shadow-xl">
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          <label htmlFor="jobTitle" className="block text-secondary-400 font-medium mb-2 text-sm">Job Position</label>
          <select
            id="jobTitle"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            className="form-select w-full p-3 rounded-lg border border-dark-800 bg-dark-900 text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
            required
          >
            <option value="">Select a job position</option>
            {jobRoles.map((role, index) => (
              <option key={index} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-secondary-400 font-medium mb-2 text-sm">Upload Resumes (Maximum 10 PDFs)</label>
          <input
            type="file"
            onChange={handleResumeChange}
            className="block w-full text-sm text-secondary-400 file:mr-4 file:py-3 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary-500 file:text-white hover:file:bg-primary-600 transition-all duration-200"
            accept=".pdf"
            multiple
            required
          />
          <p className="text-xs text-secondary-400 mt-2">Selected files: {resumes.length}</p>
        </div>
      </div>

      <div className="mb-8">
        <label htmlFor="jobDescription" className="block text-secondary-400 font-medium mb-2 text-sm">Job Description</label>
        <textarea
          id="jobDescription"
          value={jobDescText}
          onChange={(e) => setJobDescText(e.target.value)}
          className="form-textarea w-full p-4 rounded-lg border border-dark-800 bg-dark-900 text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 h-36"
          placeholder="Enter detailed job description"
          required
        />
      </div>

      <div className="mb-10">
        <div className="flex justify-between items-center mb-3">
          <label className="block text-secondary-400 font-medium text-sm">Analysis Criteria</label>
          <div className="space-x-2">
            <button
              type="button"
              onClick={selectAllFactors}
              className="px-3 py-1.5 text-xs bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors duration-200"
            >
              Select All
            </button>
            <button
              type="button"
              onClick={clearAllFactors}
              className="px-3 py-1.5 text-xs bg-dark-800 hover:bg-dark-700 text-secondary-400 rounded-lg transition-colors duration-200"
            >
              Clear All
            </button>
          </div>
        </div>
        <div className="bg-dark-900 p-4 rounded-lg border border-dark-800 grid grid-cols-2 md:grid-cols-3 gap-4">
          {factorOptions.map((factor) => (
            <div key={factor.id} className="flex items-center">
              <input
                id={factor.id}
                type="checkbox"
                checked={analysisFactors[factor.id]}
                onChange={() => handleFactorChange(factor.id)}
                className="w-4 h-4 text-primary-500 bg-dark-800 border-dark-700 rounded focus:ring-primary-500 focus:ring-offset-dark-900"
              />
              <label htmlFor={factor.id} className="ml-2 text-sm font-medium text-secondary-400">
                {factor.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      {uploadProgress > 0 && (
        <div className="mb-6">
          <div className="w-full bg-dark-800 rounded-full h-2">
            <div
              className="bg-primary-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <p className="text-xs text-center mt-2 text-secondary-400">{uploadProgress}% uploaded</p>
        </div>
      )}

      <button
        type="submit"
        className="w-full btn-main-action"
      >
        Analyze Resumes
      </button>
    </form>
  );
}