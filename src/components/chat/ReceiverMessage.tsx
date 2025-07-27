import React from 'react';

interface ReceiverMessageProps {
  content: string;
  timestamp: string;
}

export const ReceiverMessage: React.FC<ReceiverMessageProps> = ({ content, timestamp }) => {
  return (
    <div className="flex justify-start flex-col">
      <div className="bg-white p-4 rounded-lg shadow-md max-w-xs">
        <p className="text-sm text-gray-800">{content}</p>
      </div>
      <span className="text-xs text-gray-500 block mt-2">{timestamp}</span>
    </div>
  );
};
