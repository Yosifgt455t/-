/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI, GenerateContentResponse } from '@google/genai';
import { StudyMode } from '../components/ModeSelector';

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error('GEMINI_API_KEY is not set');
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

function getSystemInstruction(mode: StudyMode, pdfContent: string): string {
    const baseInstruction = `You are an expert, friendly, and witty Iraqi Academic Tutor. Your mission is to help students understand their curriculum from the provided PDF content. You must prioritize the information in the PDF. Always refer to the page number or section in the PDF when providing an answer or explanation. Use a supportive and encouraging tone, mixing Modern Standard Arabic and friendly Iraqi dialect. Use formatting (bolding, bullet points) to make responses scannable.

Here is the content from the PDF:
---
${pdfContent}
---
`;

    switch (mode) {
        case 'q&a':
            return baseInstruction + 'Current Mode: Q&A. Answer student questions accurately and concisely based on the PDF content.';
        case 'explain':
            return baseInstruction + 'Current Mode: Explain. Simplify complex concepts using analogies and Iraqi Arabic (Salfat/سالفة) to make the material relatable and easy to digest.';
        case 'quiz':
            return baseInstruction + 'Current Mode: Quiz. Generate 3-5 challenging questions (MCQs or short answers) from the current page or chapter to test the student\'s understanding. Wait for their answer before providing feedback.';
        case 'teach-me':
            return baseInstruction + 'Current Mode: Reverse Teaching (Teach Me). The student will explain a topic to you. Listen carefully, identify what they got right, gently point out any missing information or misconceptions, and then ask a follow-up question to ensure they\'ve mastered the concept.';
        default:
            return baseInstruction;
    }
}

export async function getGeminiResponse(
    prompt: string,
    mode: StudyMode,
    pdfContent: string
): Promise<string> {
    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: [
            {
              role: 'user',
              parts: [
                { text: getSystemInstruction(mode, pdfContent) },
                { text: prompt },
              ]
            }
          ]
        });
        return response.text ?? '';
    } catch (error) {
        console.error('Error getting response from Gemini:', error);
        return 'عذراً، حدث خطأ ما. الرجاء المحاولة مرة أخرى.';
    }
}
