import React from 'react';

interface AvatarProps {
  hasImg?: boolean; // true면 분홍/보라 그라디언트, false면 기본 보라 그라디언트
}

export const Avatar: React.FC<AvatarProps> = ({ hasImg = false }) => {
  return (
    <div
      className={`w-[42px] h-[42px] rounded-full relative cursor-pointer transition-transform duration-150 ease-out hover:scale-[1.05] shadow-sm border-2 border-white
      ${
        hasImg
          ? 'bg-gradient-to-br from-[#FFB6E1] to-[#B5A6FF]'
          : 'bg-gradient-to-br from-[#C9B6FF] to-[#8961F4]'
      }`}
    >
      {/* 프로필 이미지나 이니셜이 채워지지 않았을 때만 알파벳 'U'를 중앙에 띄움. */}
      {!hasImg && (
        <span className="absolute inset-0 flex items-center justify-center font-extrabold text-white text-[13px]">
          U
        </span>
      )}
      {/* 아바타 외곽의 1.5px 테두리 */}
      <div className="absolute inset-0 rounded-full border-[1.5px] border-[#E5E5EC] pointer-events-none" />
    </div>
  );
};
