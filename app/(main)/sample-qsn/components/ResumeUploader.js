// components/ResumeUploader.js
'use client';

import { useState } from 'react';

export default function ResumeUploader({ onTextExtracted }) {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleFileSelect = (e) => {
    handleFiles(e.target.files);
  };

  const handleFiles = async (files) => {
    const file = files[0];
    if (!file || file.type !== 'application/pdf') {
      alert('Please upload a PDF file');
      return;
    }

    setFileName(file.name);
    setIsProcessing(true);

    try {
      const formData = new FormData();
      formData.append('pdf', file);

      const response = await fetch('/api/extract-text-sample', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to extract text from PDF');
      }

      const data = await response.json();
      onTextExtracted(data.text);
    } catch (error) {
      console.error('Error extracting text:', error);
      alert('Failed to extract text from PDF. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div
      className={`border-2 border-dashed rounded-xl p-10 text-center transition-all duration-300 ${
        isDragging
          ? 'border-primary-500 bg-primary-900/20 shadow-lg shadow-primary-900/20'
          : 'border-dark-700 hover:border-primary-500/50 hover:bg-dark-800/20'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className={`p-4 rounded-full ${isDragging ? 'bg-primary-900/50' : 'bg-dark-800'} transition-colors duration-300`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>

        {fileName ? (
          <div className="bg-dark-800 rounded-lg px-4 py-2 max-w-full overflow-hidden border border-dark-700">
            <p className="text-sm text-secondary-400 truncate">{fileName}</p>
          </div>
        ) : (
          <p className="text-secondary-400 max-w-sm">Drag and drop your resume (PDF) or click to browse</p>
        )}

        <input
          type="file"
          id="file-upload"
          className="hidden"
          accept="application/pdf"
          onChange={handleFileSelect}
          disabled={isProcessing}
        />

        <label
          htmlFor="file-upload"
          className={`${
            isProcessing
              ? 'bg-dark-700 cursor-not-allowed text-secondary-400 px-5 py-3 rounded-lg font-medium'
              : 'btn-main-action cursor-pointer'
          }`}
        >
          {isProcessing ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
              Processing...
            </span>
          ) : 'Select PDF'}
        </label>

        <p className="text-xs text-secondary-500">Supported format: PDF</p>
      </div>
    </div>
  );
}