import React from 'react';
import { Avatar } from './Avatar';
import { Button } from './Button';

interface GnbProps {
  isLoggedIn?: boolean;
  className?: string;
}

export const Gnb: React.FC<GnbProps> = ({ isLoggedIn = false, className = '' }) => {
  return (
    /* ============================================================
       GNB 전체 벨트
       ============================================================ */
    <header className={`h-[80px] bg-white/70 backdrop-blur-[20px] border-b border-[#F0F0F4] sticky top-0 z-50 w-full min-w-[1440px] ${className}`}>
      
      {/* .gnb-inner: 최대 너비 1280px, 정중앙 정렬, 양옆 패딩 32px */}
      <div className="max-w-[1280px] mx-auto h-full flex items-center gap-[24px] px-[32px]">
        
        {/* .logo: 로고 아이콘 + 서비스 이름 */}
        <a href="/" className="flex items-center gap-[10px] shrink-0 font-extrabold text-[19px] tracking-[-0.02em] text-[#0F0F1A] select-none">
          {/* .logo-cube: -8도 회전하는 로고 큐브 */}
          <div className="w-[34px] h-[34px] transform -rotate-[8deg] shrink-0">
            <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" className="w-full h-full block">
              <defs>
                <linearGradient id="cubeTop" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#C9B6FF"/><stop offset="100%" stopColor="#8961F4"/></linearGradient>
                <linearGradient id="cubeLeft" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8961F4"/><stop offset="100%" stopColor="#5538C8"/></linearGradient>
                <linearGradient id="cubeRight" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#A07BF9"/><stop offset="100%" stopColor="#6E4FEA"/></linearGradient>
              </defs>
              <path d="M20 4 L34 11 L20 18 L6 11 Z" fill="url(#cubeTop)"/>
              <path d="M6 11 L20 18 L20 35 L6 28 Z" fill="url(#cubeLeft)"/>
              <path d="M34 11 L20 18 L20 35 L34 28 Z" fill="url(#cubeRight)"/>
            </svg>
          </div>
          MuMul Box
        </a>

        {/* .gnb-search: 유저 검색바 (가로 280px, 높이 42px, 완전 정원 캡슐형) */}
        <div className="flex items-center gap-[10px] flex-[0_0_280px] h-[42px] px-[18px] bg-white border border-[#E5E5EC] rounded-full text-[14px]">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9B9BA8" strokeWidth="2.5" className="shrink-0">
            <circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>
          </svg>
          <input 
            type="text" 
            placeholder="닉네임으로 유저 찾기" 
            className="flex-1 border-0 outline-none bg-transparent text-[14px] text-[#6B6B7B] placeholder-[#9B9BA8] font-normal"
          />
        </div>

        {/* .gnb-spacer: 중간 공간을 밀어내서 우측 정렬을 만드는 여백 */}
        <div className="flex-1" />

        {/* .gnb-actions: 가로 정렬 바구니 */}
        <div className="flex items-center">
          {isLoggedIn ? (
            /* ============================================================
               [로그인 인증 완료 상태] 우측 메뉴 (gap: 12px)
               ============================================================ */
            <div className="flex items-center gap-[12px]">
              {/* 내 질문함 */}
              <a href="#">
                <Button 
                  variant="outline" 
                  className="h-[42px] px-[18px] rounded-full text-[14px] font-bold border border-[#E5E5EC] text-[#2A2A38] gap-[8px]"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-[16px] h-[16px]">
                    <path d="M22 12h-6l-2 3h-4l-2-3H2"/>
                    <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>
                  </svg>
                  <span>내 질문함</span>
                  <span className="inline-flex items-center justify-center min-w-[20px] h-[20px] px-[6px] rounded-full bg-gradient-to-br from-[#A07BF9] to-[#6E4FEA] text-white text-[11px] font-extrabold leading-none">
                    3
                  </span>
                </Button>
              </a>

              {/* 알림 버튼 */}
              <button className="w-[42px] h-[42px] rounded-full border border-[#E5E5EC] bg-white text-[#2A2A38] relative flex items-center justify-center transition-colors duration-150 ease-in-out hover:border-[#8E78FF] hover:text-[#6D5BFF] cursor-pointer">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-[16px] h-[16px]">
                  <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"/>
                </svg>
                <span className="absolute top-[8px] right-[10px] w-[8px] h-[8px] rounded-full bg-[#FF5C5C] border-2 border-white" />
              </button>

              {/* 마이페이지 아바타 */}
              <Avatar hasImg={true} />

              {/* 로그아웃 버튼 */}
              <button className="inline-flex items-center gap-[6px] h-[42px] px-[14px] rounded-full text-[13px] font-semibold text-[#9B9BA8] transition-colors duration-150 ease-in-out hover:text-[#FF5C5C] cursor-pointer">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-[14px] h-[14px]">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>
                </svg>
                <span>로그아웃</span>
              </button>
            </div>
          ) : (
            /* ============================================================
               [비로그인 / 로그아웃 상태] 우측 메뉴 (gap: 10px)
               ============================================================ */
            <div className="flex items-center gap-[10px]">
              
              {/* 1. 로그인 버튼 (.btn-ghost 스펙 그대로) */}
              <a href="#">
                <Button 
                  variant="outline" 
                  className="h-[42px] px-[20px] rounded-full text-[14px] font-bold border border-[#E5E5EC] text-[#2A2A38]"
                >
                  로그인
                </Button>
              </a>

              {/* 2. 회원가입 버튼 (.btn-primary 스펙 그대로) */}
              <a href="#">
                <Button 
                  variant="primary" 
                  className="h-[42px] px-[22px] rounded-full bg-gradient-to-br from-[#A07BF9] to-[#6E4FEA] text-white text-[14px] font-bold shadow-sm hover:translate-y-0"
                >
                  회원가입
                </Button>
              </a>

            </div>
          )}
        </div>

      </div>
    </header>
  );
};