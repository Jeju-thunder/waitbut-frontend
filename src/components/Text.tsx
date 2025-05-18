import React from 'react';

interface TextProps {
  text?: string | number;
  className?: string;
  highlight?: string;
  style?: React.CSSProperties;
}

const Text = ({ text, className, style, highlight }: TextProps) => {
  const titleParts = text ? String(text).split('/n') : [];

  return (
    <div
      className={`flex flex-col ${className}`}
      style={style}
    >
      {titleParts.map((part, index) => (
        <p
          key={index}
          className="text-center"
        >
          {highlight && part.includes(highlight) ? (
            <>
              {part.split(highlight)[0]}
              <span className="text-blue-500">{highlight}</span>
              {part.split(highlight)[1]}
            </>
          ) : (
            part
          )}
        </p>
      ))}
    </div>
  );
};

export default Text;
