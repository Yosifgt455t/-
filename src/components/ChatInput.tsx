/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FC, useState } from 'react';
import { Mic, Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onStartRecording: () => void;
  isRecording: boolean;
}

const ChatInput: FC<ChatInputProps> = ({ onSendMessage, onStartRecording, isRecording }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className="flex w-full items-center space-x-3 rounded-full bg-slate-700 p-2 shadow-lg">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        placeholder="اسأل أي سؤال..."
        className="flex-1 bg-transparent px-4 text-white placeholder-gray-400 focus:outline-none"
        dir="rtl"
      />
      <button
        onClick={handleSend}
        className="rounded-full bg-cyan-600 p-3 text-white transition-colors hover:bg-cyan-700"
      >
        <Send size={20} />
      </button>
      <button
        onClick={onStartRecording}
        className={`rounded-full p-3 text-white transition-colors ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-cyan-600 hover:bg-cyan-700'}`}
      >
        <Mic size={20} />
      </button>
    </div>
  );
};

export default ChatInput;
