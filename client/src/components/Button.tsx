import React from 'react';

// 1. 외부에서 조종할 수 있는 옵션(Props) 정의.
export type ButtonVariant = 'primary' | 'outline' | 'dark' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant; // 4가지 디자인 스타일
  size?: ButtonSize; // 3가지 크기 스케일
  pill?: boolean; // true면 rounded-full (GNB 등 캡슐형 버튼)
  href?: string; // 있으면 <a> 태그로 렌더링
  className?: string;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  pill = false,
  href,
  className = '',
  onClick,
}) => {
  // 2. 글자 두께, 정렬, 마우스 커서, 애니메이션 등 모든 버튼이 공유하는 기본 뼈대 스타일.
  const baseStyle =
    'font-semibold inline-flex items-center justify-center gap-[8px] cursor-pointer transition-all duration-150 ease-out select-none';

  // 3. 페이지 디자인 토큰 기준 크기 스타일 지도.
  const sizeStyles = {
    // 작은 버튼: 높이 36px, 패딩 14px, 글자 13px, 모서리 10px (--r-sm)
    sm: 'h-[36px] px-[14px] text-[13px] rounded-[10px]',
    // 중간 버튼: 높이 44px, 패딩 20px, 글자 14px, 모서리 14px (--r-md)
    md: 'h-[44px] px-[20px] text-[14px] rounded-[14px]',
    // 큰 버튼: 높이 52px, 패딩 28px, 글자 15px, 모서리 14px (--r-md)
    lg: 'h-[52px] px-[28px] text-[15px] rounded-[14px]',
  };

  // 4. 페이지 디자인 토큰 기준 색상 스타일 지도.
  const variantStyles = {
    // grad-main(#A07BF9 → #6E4FEA) 그라디언트 + 브랜드 광원 그림자
    primary:
      'bg-[linear-gradient(135deg,#A07BF9_0%,#6E4FEA_100%)] text-white shadow-[0_14px_32px_rgba(110,79,234,0.28)] hover:-translate-y-[1px]',
    // 흰 배경 + --b-2(#DCD3EB) 보라빛 회색 테두리, 호버 시 보라 톤
    outline:
      'bg-white text-[#1F1F2E] border border-[#DCD3EB] hover:border-[#A07BF9] hover:text-[#6E4FEA]',
    // --t-strong(#0E0E1A) 어두운 단색 + 호버 시 보조 톤
    dark: 'bg-[#0E0E1A] text-white hover:bg-[#1F1F2E] hover:-translate-y-[1px]',
    // 투명 배경 + 호버 시 --p-50(#F4F0FE) 연보라 배경
    ghost:
      'bg-transparent text-[#6B6B7E] hover:bg-[#F4F0FE] hover:text-[#6E4FEA]',
  };

  const cls =
    `${baseStyle} ${sizeStyles[size]} ${variantStyles[variant]} ${pill ? 'rounded-full' : ''} ${className}`.trim();

  // href가 있으면 <a>, 없으면 <button>
  if (href) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <button className={cls} onClick={onClick}>
      {children}
    </button>
  );
};
