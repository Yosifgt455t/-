/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import ChatBubble from './components/ChatBubble';
import ChatInput from './components/ChatInput';
import FileUpload from './components/FileUpload';
import ModeSelector, { StudyMode } from './components/ModeSelector';
import { BookOpen, LoaderCircle } from 'lucide-react';
import { extractTextFromPdf } from './services/pdfService';
import { getGeminiResponse } from './services/geminiService';

interface Message {
  text: string;
  sender: 'user' | 'ai';
}

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMode, setCurrentMode] = useState<StudyMode>('explain');
  const [isRecording, setIsRecording] = useState(false);
  const [pdfText, setPdfText] = useState<string | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (text: string) => {
    if (!pdfText) return;
    setMessages(prev => [...prev, { text, sender: 'user' }]);
    setIsLoading(true);
    const aiResponse = await getGeminiResponse(text, currentMode, pdfText);
    setMessages(prev => [...prev, { text: aiResponse, sender: 'ai' }]);
    setIsLoading(false);
  };

  const handleFileUpload = async (file: File) => {
    setPdfFile(file);
    setIsLoading(true);
    try {
      const text = await extractTextFromPdf(file);
      setPdfText(text);
      setMessages([]); // Clear previous chat history
    } catch (error) {
      console.error('Error processing PDF:', error);
      // You might want to show an error message to the user
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex h-screen flex-col bg-slate-900 font-sans text-gray-200">
      <header className="flex items-center justify-between border-b-2 border-slate-700 bg-slate-800 px-8 py-4 shadow-lg">
        <div className="flex items-center space-x-3">
          <BookOpen className="text-cyan-400" size={32} />
          <h1 className="text-2xl font-bold text-white">المساعد الدراسي العراقي</h1>
        </div>
        <ModeSelector currentMode={currentMode} onModeChange={setCurrentMode} />
      </header>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="mx-auto flex max-w-4xl flex-col space-y-6">
          {messages.length === 0 && !pdfFile && (
            <div className="flex flex-col items-center justify-center rounded-2xl bg-slate-800 p-12 text-center shadow-xl">
                <h2 className="mb-4 text-xl font-bold text-white">مرحباً بك في المساعد الدراسي</h2>
                <p className="mb-8 text-gray-400">ابدأ برفع ملف المادة الدراسية (PDF) لتفعيل الشرح والميزات الأخرى.</p>
                <FileUpload onFileUpload={handleFileUpload} />
            </div>
          )}

          {pdfFile && !isLoading && pdfText && messages.length === 0 && (
             <div className="rounded-lg bg-cyan-900/50 p-4 text-center text-cyan-300">
                تم تحليل الملف بنجاح: <strong>{pdfFile.name}</strong>. يمكنك الآن طرح الأسئلة!
             </div>
          )}

          {messages.map((msg, index) => (
            <ChatBubble key={index} message={msg.text} sender={msg.sender} />
          ))}

          {isLoading && (
            <div className="flex items-center self-start rounded-2xl bg-slate-700 px-5 py-3 text-gray-200 shadow-md">
                <LoaderCircle className="animate-spin text-cyan-500" size={24} />
                <p className="ml-3">الذكي ديجاوب...</p>
            </div>
          )}
        </div>
      </div>

      <footer className="border-t-2 border-slate-700 bg-slate-800/80 p-4 backdrop-blur-sm">
        <div className="mx-auto max-w-4xl">
          <ChatInput 
            onSendMessage={handleSendMessage} 
            onStartRecording={() => setIsRecording(!isRecording)}
            isRecording={isRecording}
          />
        </div>
      </footer>
    </main>
  );
}
