import { NextResponse } from 'next/server';
import { extractTextFromPDF } from '@/lib/pdfParser';
import { analyzeResume } from '@/lib/geminiClient';

export const config = {
  api: {
    bodyParser: false,
    responseLimit: false,
  },
};

export async function POST(request) {
  try {
    const formData = await request.formData();
    const jobDescText = formData.get('jobDescText');
    const jobTitle = formData.get('jobTitle');
    const analysisFactorsString = formData.get('analysisFactors');
    
    if (!jobDescText || !jobTitle) {
      return NextResponse.json(
        { error: 'Job description and title are required' },
        { status: 400 }
      );
    }
    
    // Parse analysis factors
    let analysisFactors = {
      skills: true,
      experience: true,
      education: true,
      projects: true,
      certifications: true,
      resumeQuality: true
    };
    
    try {
      if (analysisFactorsString) {
        analysisFactors = JSON.parse(analysisFactorsString);
      }
    } catch (error) {
      console.error('Error parsing analysis factors:', error);
      // Continue with default factors if parsing fails
    }
    
    // Collect all resume files from the form data
    const resumeFiles = [];
    let i = 1;
    while (formData.has(`resume${i}`)) {
      resumeFiles.push(formData.get(`resume${i}`));
      i++;
    }
    
    if (resumeFiles.length === 0) {
      return NextResponse.json(
        { error: 'At least one resume is required' },
        { status: 400 }
      );
    }
    
    // Process each resume in parallel
    const analysisPromises = resumeFiles.map(async (resumeFile) => {
      const resumeBuffer = Buffer.from(await resumeFile.arrayBuffer());
      const resumeText = await extractTextFromPDF(resumeBuffer);
      return await analyzeResume(resumeText, jobDescText, jobTitle, analysisFactors);
    });
    
    const results = await Promise.all(analysisPromises);
    
    return NextResponse.json({ results });
  } catch (error) {
    console.error('Error in resume analysis:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred during analysis' },
      { status: 500 }
    );
  }
}