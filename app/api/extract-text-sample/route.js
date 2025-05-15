// app/api/extract-text-sample/route.js
import { NextResponse } from 'next/server';
import { extractTextFromPDF } from '@/lib/serverlessPdfParser';

// Configure the API route for larger file uploads
export const config = {
  api: {
    bodyParser: false,
    responseLimit: '10mb',
  },
};

export async function POST(request) {
  try {
    // Extract form data
    const formData = await request.formData();

    // Ensure the uploaded PDF file is correctly retrieved from form data
    const pdfFile = formData.get('pdf');

    if (!pdfFile) {
      return NextResponse.json({ error: 'No PDF file uploaded' }, { status: 400 });
    }

    // Convert the file to a buffer directly without saving to disk
    const buffer = Buffer.from(await pdfFile.arrayBuffer());

    // Use our serverless-friendly PDF parser
    const text = await extractTextFromPDF(buffer);

    // Return the extracted text as a JSON response
    return NextResponse.json({ text });

  } catch (error) {
    console.error('Error processing PDF:', error);
    return NextResponse.json({
      error: 'Failed to process PDF',
      details: error.message
    }, { status: 500 });
  }
}
