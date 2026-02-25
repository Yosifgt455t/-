/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FC } from 'react';
import ReactMarkdown from 'react-markdown';

interface ChatBubbleProps {
  message: string;
  sender: 'user' | 'ai';
}

const ChatBubble: FC<ChatBubbleProps> = ({ message, sender }) => {
  const bubbleClasses = sender === 'user'
    ? 'bg-cyan-600 text-white self-end'
    : 'bg-slate-700 text-gray-200 self-start';

  return (
    <div className={`w-full max-w-xl rounded-2xl px-5 py-3 shadow-md ${bubbleClasses}`}>
        <div className={`prose prose-sm max-w-none ${sender === 'user' ? 'text-white' : 'text-gray-200'}`}>
            <ReactMarkdown
              components={{
                p: ({node, ...props}) => <p className={`${sender === 'user' ? 'text-white' : 'text-gray-200'}`} {...props} />,
                strong: ({node, ...props}) => <strong className="font-bold" {...props} />,
                em: ({node, ...props}) => <em className="italic" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc list-inside" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal list-inside" {...props} />,
                li: ({node, ...props}) => <li className="mb-1" {...props} />,
              }}
            >
                {message}
            </ReactMarkdown>
        </div>
    </div>
  );
};

export default ChatBubble;
