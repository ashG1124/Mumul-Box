import React from 'react';

interface AvatarProps {
  hasImg?: boolean; // true면 분홍/보라 그라디언트, false면 기본 보라 그라디언트
  size?: number; // 디자인 가이드 기준 기본 44px, GNB 등에서는 42px 사용
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  hasImg = false,
  size = 44,
  className = '',
}) => {
  return (
    <div
      style={{ width: `${size}px`, height: `${size}px` }}
      className={`rounded-full shrink-0 flex items-center justify-center
        ${
          hasImg
            ? 'bg-gradient-to-br from-[#FFB6E1] to-[var(--primary-300)]'
            : 'bg-gradient-to-br from-[var(--primary-300)] to-[var(--primary-500)]'
        } ${className}`.trim()}
    ></div>
  );
};
