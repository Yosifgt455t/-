/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as pdfjs from 'pdfjs-dist';
import 'pdfjs-dist/build/pdf.worker.min.mjs';

export async function extractTextFromPdf(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjs.getDocument(arrayBuffer).promise;
  let fullText = '';

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map(item => (item as any).str).join(' ');
    fullText += pageText + '\n\n';
  }

  return fullText;
}
