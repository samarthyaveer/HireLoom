import { GoogleGenerativeAI } from '@google/generative-ai';

// Use a fixed API key to ensure it works
const API_KEY = "AIzaSyDgK_VdSnfdIXwoYwm-qY-yh0Tnl13SGwQ";

export async function analyzeResume(resumeText, jobDescription, jobTitle, analysisFactors = null) {
  try {
    // Initialize the Gemini API client
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    
    // Default analysis factors if none provided, now in the specific priority order
    const factors = analysisFactors || {
      skills: true,
      experience: true,
      projects: true,
      resumeQuality: true,
      education: true,
      certifications: true
    };
    
    // Build the analysis instructions based on selected factors and priority order
    let analysisInstructions = '';
    
    if (factors.skills) {
      analysisInstructions += `
      3. TECHNICAL SKILLS ANALYSIS:
         - Identify technical skills that match job requirements
         - Identify important technical skills missing from the resume
         - Calculate a skills match percentage
      `;
    }
    
    if (factors.experience) {
      analysisInstructions += `
      4. WORK EXPERIENCE EVALUATION:
         - Assess relevance of work history to the position
         - Identify achievements that demonstrate required competencies
         - Note any gaps or concerns in employment history
      `;
    }
    
    if (factors.projects) {
      analysisInstructions += `
      5. PROJECT ANALYSIS:
         - Evaluate relevance of listed projects to the position
         - Identify key technologies/methodologies used in projects that align with job requirements
      `;
    }
    
    if (factors.resumeQuality) {
      analysisInstructions += `
      6. RESUME QUALITY:
         - Score clarity, organization, and formatting (1-10)
         - Note any issues with spelling, grammar, or structure
         - Assess ATS-friendliness of the resume format
      `;
    }
    
    if (factors.education) {
      analysisInstructions += `
      7. EDUCATION ASSESSMENT:
         - Evaluate if education requirements for the position are met
         - Note any educational advantages or disadvantages
      `;
    }
    
    if (factors.certifications) {
      analysisInstructions += `
      8. CERTIFICATIONS & ACHIEVEMENTS:
         - List relevant certifications/awards that strengthen the application
         - Identify recommended certifications not present that would enhance candidacy
      `;
    }
    
    // Always include candidate profile and overall evaluation
    const basePrompt = `
      Perform a comprehensive analysis of this resume against the provided job description for the position of "${jobTitle}".
      
      RESUME:
      ${resumeText}
      
      JOB DESCRIPTION:
      ${jobDescription}
      
      Evaluate the resume thoroughly and provide a detailed assessment addressing the following aspects:
      
      1. CANDIDATE PROFILE:
         - Extract the candidate's full name
         - Years of relevant experience
         - Key educational qualifications
      
      2. PROFESSIONAL SUMMARY ASSESSMENT:
         - Evaluate how effectively the professional summary aligns with the job requirements
         - Rate the clarity and impact of the summary (1-10)
         - Suggest improvements if applicable
      
      ${analysisInstructions}
      
      9. OVERALL EVALUATION:
         - Calculate an ATS compatibility score (0-100) based on keyword matching and overall fit
         - Determine if this candidate is a good match for the position (true/false)
         - Provide 1-2 sentence summary of the candidate's fit
    `;
    
    // Build JSON structure based on selected factors in priority order
    let jsonStructure = `{
      "candidateProfile": {
        "name": "Candidate's Full Name",
        "yearsOfExperience": 5,
        "education": "Highest Degree, Field, Institution"
      },
      "professionalSummary": {
        "alignmentScore": 8,
        "strengths": ["Clear articulation of relevant skills", "Demonstrates understanding of the role"],
        "improvementSuggestions": ["Could emphasize leadership experience more"]
      },`;
    
    if (factors.skills) {
      jsonStructure += `
      "technicalSkills": {
        "matchingSkills": ["Skill 1", "Skill 2", "Skill 3", "Skill 4", "Skill 5"],
        "missingSkills": ["Important Skill 1", "Important Skill 2"],
        "skillsMatchPercentage": 75
      },`;
    }
    
    if (factors.experience) {
      jsonStructure += `
      "workExperience": {
        "relevanceScore": 8,
        "keyAchievements": ["Achievement 1", "Achievement 2"],
        "concerns": ["Gap in employment during 2020-2021"]
      },`;
    }
    
    if (factors.projects) {
      jsonStructure += `
      "projects": {
        "relevantProjects": ["Project 1", "Project 2"],
        "relevantTechnologies": ["Technology 1", "Technology 2"]
      },`;
    }
    
    if (factors.resumeQuality) {
      jsonStructure += `
      "resumeQuality": {
        "clarityScore": 7,
        "formattingIssues": ["Section headers could be more prominent"],
        "atsCompatibility": "Good but could improve keyword density"
      },`;
    }
    
    if (factors.education) {
      jsonStructure += `
      "education": {
        "meetsRequirements": true,
        "comments": "Bachelor's degree exceeds minimum requirement"
      },`;
    }
    
    if (factors.certifications) {
      jsonStructure += `
      "certificationsAchievements": {
        "relevantCertifications": ["Certification 1", "Certification 2"],
        "recommendedCertifications": ["Recommended Cert 1"]
      },`;
    }
    
    jsonStructure += `
      "overallEvaluation": {
        "atsScore": 78,
        "isMatch": true,
        "summary": "Strong technical background with relevant experience but lacks some specific skills required for the position."
      }
    }`;
    
    const prompt = `
      ${basePrompt}
      
      Return your analysis as a well-structured JSON object with the following format:
      ${jsonStructure}
      
      IMPORTANT INSTRUCTIONS:
      1. Analyze thoroughly but be fair and objective.
      2. Make sure your response is ONLY the properly formatted JSON object with no additional text or explanations.
      3. Ensure all requested JSON fields are present based on the analysis criteria specified.
      4. Be specific with feedback rather than generic statements.
      5. Follow the priority order of analysis: Technical Skills, Work Experience, Projects, Resume Quality, Education, and Certifications.
    `;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Extract the JSON object from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      // If no JSON is found, provide a fallback response
      return {
        candidateProfile: {
          name: "Unknown Candidate",
          yearsOfExperience: 0,
          education: "Unable to extract"
        },
        overallEvaluation: {
          atsScore: 0,
          isMatch: false,
          summary: "Unable to analyze resume properly."
        },
        error: "Failed to parse analysis results"
      };
    }
    
    try {
      return JSON.parse(jsonMatch[0]);
    } catch (parseError) {
      console.error('Error parsing Gemini response as JSON:', parseError);
      return {
        candidateProfile: {
          name: "Parse Error",
          yearsOfExperience: 0,
          education: "Unable to extract"
        },
        overallEvaluation: {
          atsScore: 0,
          isMatch: false,
          summary: "Error processing resume."
        },
        error: "Invalid JSON format in analysis results"
      };
    }
  } catch (error) {
    console.error('Error analyzing resume with Gemini:', error);
    return {
      candidateProfile: {
        name: `Error: ${error.message.substring(0, 30)}...`,
        yearsOfExperience: 0,
        education: "Unable to extract"
      },
      overallEvaluation: {
        atsScore: 0,
        isMatch: false,
        summary: "An error occurred during analysis."
      },
      error: error.message
    };
  }
}