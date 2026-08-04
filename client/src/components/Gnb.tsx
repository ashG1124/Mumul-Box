import React from 'react';
import { Avatar } from './Avatar';
import { Button } from './Button';
import type { ButtonVariant, ButtonSize } from './Button';

interface ButtonConfig {
  variant?: ButtonVariant;
  size?: ButtonSize;
  pill?: boolean;
  href?: string;
}

interface GnbProps {
  isLoggedIn?: boolean;
  questionCount?: number;
  hasNotification?: boolean;
  avatarHasImg?: boolean;
  questionBoxButton?: ButtonConfig;
  loginButton?: ButtonConfig;
  signUpButton?: ButtonConfig;
}

export const Gnb: React.FC<GnbProps> = ({
  isLoggedIn = false,
  questionCount = 0,
  hasNotification = false,
  avatarHasImg = false,
  questionBoxButton = { variant: 'outline', size: 'md', pill: true, href: '/inbox' },
  loginButton = { variant: 'outline', size: 'md', pill: true, href: '/login' },
  signUpButton = { variant: 'primary', size: 'md', pill: true, href: '/signup' },
}) => {
  return (
    <header className="h-[80px] bg-white/70 backdrop-blur-[20px] border-b border-[var(--border-1)] sticky top-0 z-50 w-full min-w-[1440px]">
      <div className="max-w-[1280px] mx-auto h-full flex items-center gap-[24px] px-[32px]">
        {/* 로고 영역 */}
        <a
          href="/"
          className="flex items-center gap-[10px] shrink-0 font-extrabold text-[19px] tracking-[-0.02em] text-[var(--text-900)] select-none"
        >
          <div className="w-[34px] h-[34px] transform -rotate-[8deg] shrink-0">
            <svg
              viewBox="0 0 40 40"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full block"
            >
              <defs>
                <linearGradient id="cubeTop" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="var(--primary-200)" />
                  <stop offset="100%" stopColor="var(--primary-400)" />
                </linearGradient>
                <linearGradient id="cubeLeft" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--primary-400)" />
                  <stop offset="100%" stopColor="var(--primary-600)" />
                </linearGradient>
                <linearGradient id="cubeRight" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--primary-300)" />
                  <stop offset="100%" stopColor="var(--primary-500)" />
                </linearGradient>
              </defs>
              <path d="M20 4 L34 11 L20 18 L6 11 Z" fill="url(#cubeTop)" />
              <path d="M6 11 L20 18 L20 35 L6 28 Z" fill="url(#cubeLeft)" />
              <path d="M34 11 L20 18 L20 35 L34 28 Z" fill="url(#cubeRight)" />
            </svg>
          </div>
          MuMul Box
        </a>

        {/* 유저 검색바 */}
        <div className="flex items-center gap-[10px] flex-[0_0_280px] h-[42px] px-[18px] bg-white border border-[var(--border-2)] rounded-full text-[14px]">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--text-400)"
            strokeWidth="2.5"
            className="shrink-0"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            type="text"
            placeholder={isLoggedIn ? "닉네임으로 유저 찾기" : "닉네임으로 질문함 찾기"}            
            className="flex-1 border-0 outline-none bg-transparent text-[14px] text-[var(--text-500)] placeholder-[var(--text-400)] font-normal"
          />
        </div>

        {/* 여백 주머니 */}
        <div className="flex-1" />

        {/* 우측 메뉴 영역 */}
        <div className="flex items-center">
          {isLoggedIn ? (
            <div className="flex items-center gap-[12px]">
              {/* 내 질문함 (높이 42px 통일) */}
              <Button {...questionBoxButton} className="!h-[42px]">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  className="w-[16px] h-[16px]"
                >
                  <path d="M22 12h-6l-2 3h-4l-2-3H2" />
                  <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
                </svg>
                <span>내 질문함</span>
                {questionCount > 0 && (
                  <span className="inline-flex items-center justify-center min-w-[20px] h-[20px] px-[6px] rounded-full bg-[var(--primary-500)] text-white text-[11px] font-extrabold leading-none">
                    {questionCount}
                  </span>
                )}
              </Button>

              {/* 알림 버튼 (높이/너비 42px 통일) */}
              <Button
                variant="outline"
                pill
                className="!w-[42px] !h-[42px] !px-0 relative"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  className="w-[16px] h-[16px]"
                >
                  <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                {hasNotification && (
                  <span className="absolute top-[8px] right-[10px] w-[8px] h-[8px] rounded-full bg-[var(--danger)] border-2 border-white" />
                )}
              </Button>

              {/* 마이페이지 아바타 */}
              <a href="/mypage" aria-label="마이페이지">
                <Avatar 
                  hasImg={avatarHasImg} 
                  size={42} 
                  className="relative cursor-pointer transition-transform duration-150 ease-out hover:scale-[1.05] shadow-[var(--shadow-sm)] border-2 border-white after:content-[''] after:absolute after:inset-0 after:rounded-full after:border-[1.5px] after:border-[var(--border-2)] after:pointer-events-none"
                />
              </a>

              {/* 로그아웃 버튼 (HTML 원본에 맞춰서 높이를 42px로 강제 조정) */}
              <Button
                variant="ghost"
                size="sm"
                pill
                href="/" // HTML의 01-home.html 이동 반영
                className="!h-[42px] !text-[var(--text-400)] hover:!text-[var(--danger)] hover:!bg-transparent"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  className="w-[14px] h-[14px]"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
                </svg>
                <span>로그아웃</span>
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-[10px]">
              <Button {...loginButton} className="!h-[42px]">로그인</Button>
              <Button {...signUpButton} className="!h-[42px]">회원가입</Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};