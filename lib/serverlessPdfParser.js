// lib/serverlessPdfParser.js
// A more serverless-friendly PDF parser implementation

import pdfParse from 'pdf-parse/lib/pdf-parse.js';

/**
 * Extracts text from a PDF buffer using a serverless-friendly approach
 * @param {Buffer} pdfBuffer - The PDF file as a buffer
 * @returns {Promise<string>} - The extracted text
 */
export async function extractTextFromPDF(pdfBuffer) {
  try {
    // Configure options for pdf-parse to make it more serverless-friendly
    const options = {
      // Limit the maximum number of pages to parse to avoid timeouts
      max: 50,
      // Disable rendering to improve performance
      pagerender: null,
      // Use a simple version to extract text
      version: 'v1.10.100'
    };

    // Parse the PDF
    const data = await pdfParse(pdfBuffer, options);
    return data.text;
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    
    // Provide more detailed error information
    if (error.message.includes('not a PDF file')) {
      throw new Error('The uploaded file is not a valid PDF');
    } else if (error.message.includes('file is encrypted')) {
      throw new Error('The PDF file is encrypted and cannot be processed');
    } else {
      throw new Error(`Failed to parse PDF file: ${error.message}`);
    }
  }
}
