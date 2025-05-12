// app/api/generate-questions/route.js
import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { log } from 'console';

const API_KEY = process.env.GEMINI_API_KEY;
const MODEL_NAME = process.env.GEMINI_MODEL || "gemini-2.0-flash";

export async function POST(request) {
  try {
    const { resumeText } = await request.json();

    if (!resumeText) {
      return NextResponse.json({ error: 'No resume text provided' }, { status: 400 });
    }

    // Check if API key is configured
    if (!API_KEY) {
      return NextResponse.json({ error: 'API key is not configured' }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    // Step 1: Ask Gemini to extract the candidate's name
    const namePrompt = `
      Extract ONLY the candidate's full name from the resume text below.
      Return it as a plain string (no JSON, no formatting).

      RESUME:
      ${resumeText}
    `;

    const nameResult = await model.generateContent(namePrompt);
    const nameRaw = await nameResult.response.text();
    const candidateName = nameRaw.replace(/["']/g, "").trim();
    console.log(nameRaw);
    

    // Step 2: Generate the 10 interview questions
    const questionsPrompt = `
    You are a technical recruiter preparing for an interview with a candidate.
    Based on the resume provided below, generate 10 insightful and diverse interview questions:
    - Technical questions based on their skills & experience.
    - Logical reasoning or problem-solving questions.
    - Soft skills or behavioral questions.
    - Project-based questions (ask about specific projects).

    Each question must have a short 'followUp' prompt or hint.

    IMPORTANT: Return ONLY a valid JSON array of 10 objects.
    Each object must contain:
    - 'question': The interview question.
    - 'followUp': A related follow-up or hint.

    RESUME:
    ${resumeText}
    `;

    const result = await model.generateContent(questionsPrompt);
    const response = await result.response;
    let text = response.text().replace(/```json|```/g, '').trim();

    let questions;
    try {
      questions = JSON.parse(text);
    } catch (error) {
      console.error("Failed to parse JSON:", error);
      const jsonMatch = text.match(/\[\s*\{[\s\S]*\}\s*\]/);
      if (jsonMatch) {
        try {
          questions = JSON.parse(jsonMatch[0]);
        } catch (innerError) {
          console.error("Failed secondary JSON parsing:", innerError);
        }
      }
    }

    if (!questions || !Array.isArray(questions)) {
      return NextResponse.json({ error: 'Failed to generate valid interview questions.' }, { status: 500 });
    }

    return NextResponse.json({ name: candidateName, questions });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
