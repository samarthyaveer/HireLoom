import { GoogleGenerativeAI } from '@google/generative-ai';

// Use environment variable for API key
const API_KEY = process.env.GEMINI_API_KEY;

export async function POST(request) {
  try {
    const requestData = await request.json();
    const { jobPosition, jobDescription, interviewTypes, duration } = requestData;

    // Check if API key is configured
    if (!API_KEY) {
      throw new Error('Gemini API key is not configured. Please set GEMINI_API_KEY in your environment.');
    }
    
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL || "gemini-2.0-flash" });

    // Ensure randomness using a dynamic context (e.g., timestamp)
    const randomizer = Date.now();

    const prompt = `
You are an expert interviewer and HR specialist. Your task is to generate exactly **10 unique and professional interview questions** for the role of ${jobPosition}.
    
Job Description: 
${jobDescription}

Interview Duration: Approximately ${duration} minutes.

Interview Focus Areas: ${interviewTypes.join(', ')}

Make sure:
- The questions are suitable for a real interview.
- They are varied and cover the focus areas.
- They are never repeated (you can randomize based on this seed: ${randomizer}).
- Format the output as a JSON array of strings.

Only output a clean JSON array like:
[
  "First question...",
  "Second question...",
  ...
]`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    let questions;
    try {
      questions = JSON.parse(text);
    } catch (e) {
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        questions = JSON.parse(jsonMatch[0]);
      } else {
        questions = text
          .split(/\d+\.|\n+/)
          .map(q => q.trim())
          .filter(q => q.length > 10)
          .slice(0, 10); // ensure only 10 questions
      }
    }

    return Response.json({ questions });
  } catch (error) {
    console.error('Error generating questions:', error);
    return Response.json({ error: 'Failed to generate questions' }, { status: 500 });
  }
}
