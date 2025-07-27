import React from 'react';

interface SenderMessageProps {
  content: string;
  timestamp: string;
}

export const SenderMessage: React.FC<SenderMessageProps> = ({ content, timestamp }) => {
  return (
    <div className="flex justify-end items-end flex-col">
      <div className="bg-purple-600 p-4 rounded-lg shadow-md max-w-xs">
        <p className="text-sm text-white">{content}</p>
      </div>
      <span className="text-xs text-gray-500 block mt-2">{timestamp}</span>
    </div>
  );
};
