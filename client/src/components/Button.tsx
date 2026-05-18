import React from 'react';

// 1. 외부에서 조종할 수 있는 옵션(Props) 정의.
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'dark' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '',
  ...props
}) => {  
  // 2. 글자 두께, 정렬, 마우스 커서, 애니메이션 등 모든 버튼이 공유하는 기본 뼈대 스타일.
  const baseStyle = "font-semibold inline-flex items-center justify-center gap-[8px] cursor-pointer transition-all duration-150 ease-out select-none";

  // 3. 명세서 7번/8번 그리드 수치를 이식한 크기 스타일 지도.
  const sizeStyles = {
    // 작은 버튼: 높이 36px, 패딩 14px, 글자 13px, 모서리 8px
    sm: "h-[36px] px-[14px] text-[13px] rounded-[8px]",
    // 중간 버튼: 높이 44px, 패딩 22px, 글자 14px, 모서리 12px
    md: "h-[44px] px-[22px] text-[14px] rounded-[12px]",
    // 큰 버튼: 높이 52px, 패딩 28px, 글자 15px, 모서리 12px
    lg: "h-[52px] px-[28px] text-[15px] rounded-[12px]"
  };

  // 4. 명세서 1번 컬러 스케일을 매칭한 스타일 종류 지도.
  const variantStyles = {
    // primary-500(#6D5BFF) 단색 + 특수 광원 그림자 조합
    primary: "bg-[#6D5BFF] text-white shadow-[0_14px_32px_rgba(109,91,255,0.28)] hover:bg-[#5B47E0] hover:-translate-y-[1px]",
    // border-3(#D6D6E0) 선 색상 + 호버 시 보라 톤 변조 조합
    outline: "bg-white text-[#0F0F1A] border border-[#D6D6E0] hover:border-[#8E78FF] hover:text-[#6D5BFF]",
    // text-900(#0F0F1A) 어두운 단색 + 호버 시 보조 톤 조합
    dark: "bg-[#0F0F1A] text-white hover:bg-[#1F1F2E] hover:-translate-y-[1px]",
    // 배경이 없는 투명 버튼 + 호버 시 primary-50 연보라 배경 변조 조합
    ghost: "bg-transparent text-[#2A2A38] hover:bg-[#F6F4FF] hover:text-[#6D5BFF]"
  };

  return (
    /* 5. 공통 스타일, 선택된 크기 스타일, 선택된 종류 스타일을 실시간으로 조립해서 그려줌. */
    <button 
      className={`${baseStyle} ${sizeStyles[size]} ${variantStyles[variant]}${className}`}
      {...props}
    >
      {children}
    </button>
  );
};