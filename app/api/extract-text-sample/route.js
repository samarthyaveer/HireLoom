// app/api/extract-text/route.js
import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import os from 'os';
import path from 'path';
import pdfParse from 'pdf-parse'; // PDF parsing library

export async function POST(request) {
  try {
    // Extract form data
    const formData = await request.formData();
    
    // Ensure the uploaded PDF file is correctly retrieved from form data
    const pdfFile = formData.get('pdf');
    
    if (!pdfFile) {
      return NextResponse.json({ error: 'No PDF file uploaded' }, { status: 400 });
    }

    // Save the uploaded file temporarily on the server
    const tempDir = os.tmpdir();
    const filePath = path.join(tempDir, 'resume.pdf'); // Temporary file path
    
    const buffer = Buffer.from(await pdfFile.arrayBuffer());
    await fs.writeFile(filePath, buffer); // Save the file to disk

    // Parse the text content from the PDF
    const pdfData = await pdfParse(buffer);
    const text = pdfData.text; // Extracted text

    // Clean up the temporary file
    await fs.unlink(filePath); // Delete the temporary file after processing

    // Return the extracted text as a JSON response
    return NextResponse.json({ text });

  } catch (error) {
    console.error('Error processing PDF:', error);
    return NextResponse.json({ error: 'Failed to process PDF', details: error.message }, { status: 500 });
  }
}
