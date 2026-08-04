import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Gnb } from './components/Gnb';
import HomePage from '@/pages/HomePage';

// 라우트 목록 — 페이지 추가 시 여기에 <Route> 추가
export default function App() {
  // 로그인/비로그인 상태를 실시간으로 테스트하기 위한 스위치
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <div className="min-h-screen bg-[#FAFAFB] text-[#0F0F1A]">
      {/* 1. 디자인 시스템 스펙이 완벽히 반영된 GNB 바를 상단에 고정 */}
      <Gnb isLoggedIn={isLoggedIn} />

      {/* 2. 임시 로그인 토글 버튼 (테스트 후 삭제) */}
      <div className="fixed bottom-6 right-6 z-50 bg-white p-3 border border-[#E5E5EC] rounded-[12px] shadow-lg flex items-center gap-3 select-none">
        <span className="text-[12px] font-semibold text-gray-500">
          테스트 스위치:
        </span>
        <button
          onClick={() => setIsLoggedIn(!isLoggedIn)}
          className="text-[12px] font-bold px-3 py-1.5 bg-[#0F0F1A] text-white rounded-[8px] hover:bg-[#1F1F2E] cursor-pointer transition-colors"
        >
          {isLoggedIn ? '🔒 로그아웃 상태 보기' : '🔓 로그인 상태 보기'}
        </button>
      </div>

      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
}
