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
          ? 'border-purple-500 bg-purple-900/20 shadow-lg shadow-purple-900/20' 
          : 'border-gray-700 hover:border-purple-500/50 hover:bg-gray-800/20'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className={`p-4 rounded-full ${isDragging ? 'bg-purple-900/50' : 'bg-gray-800'} transition-colors duration-300`}>
        </div>
        
        {fileName ? (
          <div className="bg-gray-800 rounded-lg px-4 py-2 max-w-full overflow-hidden">
            <p className="text-sm text-gray-300 truncate">{fileName}</p>
          </div>
        ) : (
          <p className="text-gray-400 max-w-sm">Drag and drop your resume (PDF) or click to browse</p>
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
          className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-300 ${
            isProcessing 
              ? 'bg-gray-700 cursor-not-allowed' 
              : 'bg-purple-600 hover:bg-purple-700 shadow-lg hover:shadow-purple-900/25 cursor-pointer'
          } text-white`}
        >
          {isProcessing ? (
            <span className="flex items-center">
              Processing...
            </span>
          ) : 'Select PDF'}
        </label>
        
        <p className="text-xs text-gray-500">Supported format: PDF</p>
      </div>
    </div>
  );
}