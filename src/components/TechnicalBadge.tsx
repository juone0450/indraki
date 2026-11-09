import React from 'react';

interface TechnicalBadgeProps {
  leftText: string;
  rightText: string;
  variant?: 'normal' | 'signal' | 'dark';
  className?: string;
}

export const TechnicalBadge: React.FC<TechnicalBadgeProps> = ({
  leftText,
  rightText,
  variant = 'normal',
  className = '',
}) => {
  const isSignal = variant === 'signal';
  const isDark = variant === 'dark';

  return (
    <div
      className={`inline-flex items-center text-[10px] sm:text-[11px] font-mono tracking-wider border ${
        isDark
          ? 'border-[#D9B98C]/40 bg-[#16181D]'
          : 'border-[#111111] bg-[#FAF7F2]'
      } overflow-hidden shadow-none select-none ${className}`}
    >
      <span
        className={`px-2 py-0.5 font-bold uppercase transition-colors ${
          isSignal
            ? 'bg-[#FF4D22] text-[#FAF7F2]'
            : isDark
            ? 'bg-[#D9B98C] text-[#16181D]'
            : 'bg-[#111111] text-[#FAF7F2]'
        }`}
      >
        {leftText}
      </span>
      <span
        className={`px-2 py-0.5 uppercase ${
          isDark ? 'text-[#FAF7F2]/90' : 'text-[#111111]'
        }`}
      >
        {rightText}
      </span>
    </div>
  );
};
