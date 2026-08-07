import React from 'react';
import { Link } from 'react-router-dom';

// 1. 외부에서 조종할 수 있는 옵션(Props) 정의.
export type ButtonVariant = 'primary' | 'outline' | 'dark' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant; // 4가지 디자인 스타일
  size?: ButtonSize; // 3가지 크기 스케일
  pill?: boolean; // true면 rounded-full (GNB 등 캡슐형 버튼)
  to?: string; // 앱 내부 경로 — <Link>로 렌더링 (새로고침 없이 이동)
  href?: string; // 외부 링크 — <a> 태그로 렌더링
  className?: string;
  onClick?: () => void;
  'aria-label'?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  pill = false,
  to,
  href,
  className = '',
  onClick,
  'aria-label': ariaLabel,
}) => {
  // 2. 글자 두께, 정렬, 마우스 커서, 애니메이션 등 모든 버튼이 공유하는 기본 뼈대 스타일.
  const baseStyle =
    'font-semibold inline-flex items-center justify-center gap-[8px] cursor-pointer transition-all duration-[180ms] ease-out select-none tracking-[-0.01em] border border-transparent';

  // 3. 페이지 디자인 토큰 기준 크기 스타일 지도.
  const sizeStyles = {
    sm: 'h-[36px] px-[14px] text-[13px] rounded-[var(--r-sm)]',
    md: 'h-[44px] px-[22px] text-[14px] rounded-[var(--r-md)]',
    lg: 'h-[52px] px-[28px] text-[15px] rounded-[var(--r-md)]',
  };

  // 4. 페이지 디자인 토큰 기준 색상 스타일 지도.
  const variantStyles = {
    // grad-main(#A07BF9 → #6E4FEA) 그라디언트 + 브랜드 광원 그림자
    primary:
      'bg-[var(--primary-500)] text-white shadow-[var(--shadow-brand)] hover:bg-[var(--primary-600)] hover:-translate-y-[1px]',
    // 흰 배경 + --b-2(#DCD3EB) 보라빛 회색 테두리, 호버 시 보라 톤
    outline:
      'bg-[var(--surface)] text-[var(--text-900)] !border-[var(--border-3)] hover:!border-[var(--primary-400)] hover:text-[var(--primary-600)]',
    dark: 'bg-[var(--text-900)] text-white hover:bg-[#1F1F2E]',
    ghost:
      'bg-transparent text-[var(--text-700)] hover:bg-[var(--primary-50)] hover:text-[var(--primary-600)]',
  };

  // 4. pill 옵션이 true면 동그라미(rounded-full)를 강제로 적용 (!important 역할)
  const radiusOverride = pill ? '!rounded-[var(--r-full)]' : '';

  const cls =
    `${baseStyle} ${sizeStyles[size]} ${variantStyles[variant]} ${radiusOverride} ${className}`.trim();

  // 5. to는 앱 내부 이동(Link), href는 외부 링크(a), 둘 다 없으면 <button>
  if (to) {
    return (
      <Link to={to} className={cls} onClick={onClick} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={cls} onClick={onClick} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }
  return (
    <button className={cls} onClick={onClick} aria-label={ariaLabel}>
      {children}
    </button>
  );
};
