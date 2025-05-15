// app/api/generate-questions-sample/route.js
import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_API_KEY, GEMINI_MODEL, isGeminiConfigured } from '@/lib/env';

export async function POST(request) {
  try {
    const { resumeText } = await request.json();

    if (!resumeText) {
      return NextResponse.json({ error: 'No resume text provided' }, { status: 400 });
    }

    // Check if API key is configured
    if (!isGeminiConfigured()) {
      return NextResponse.json({
        error: 'Gemini API key is not configured. Please set GEMINI_API_KEY in your environment.',
      }, { status: 500 });
    }

    // Initialize the Gemini API client
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });

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
      // Try to extract JSON from the response if direct parsing fails
      const jsonMatch = text.match(/\[\s*\{[\s\S]*\}\s*\]/);
      if (jsonMatch) {
        try {
          questions = JSON.parse(jsonMatch[0]);
        } catch (innerError) {
          // If both parsing attempts fail, questions will remain undefined
        }
      }
    }

    if (!questions || !Array.isArray(questions)) {
      return NextResponse.json({ error: 'Failed to generate valid interview questions.' }, { status: 500 });
    }

    return NextResponse.json({ name: candidateName, questions });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
