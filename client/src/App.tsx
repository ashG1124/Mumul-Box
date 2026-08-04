import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Gnb } from '@/components/Gnb';
import HomePage from '@/pages/HomePage';
import QBoxPage from '@/pages/QBoxPage';
import InboxPage from '@/pages/InboxPage';
import MyPage from '@/pages/MyPage';
import SearchPage from '@/pages/SearchPage';
import AnswersPage from '@/pages/AnswersPage';

// 라우트 목록 — 페이지 추가 시 여기에 <Route> 추가
export default function App() {
  // 로그인/비로그인 상태를 실시간으로 테스트하기 위한 스위치
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <div
      className="min-h-screen text-[var(--text-900)]"
      style={{
        background: `radial-gradient(ellipse 60% 50% at 20% 0%, #EEE4FF 0%, transparent 60%), 
                     radial-gradient(ellipse 50% 40% at 90% 10%, #FFD8F2 0%, transparent 60%), 
                     var(--bg)`,
      }}
    >
      <Gnb
        isLoggedIn={isLoggedIn}
        questionCount={3}
        hasNotification={true}
        avatarHasImg={true}
      />

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
        <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} />} />
        <Route path="/qbox" element={<QBoxPage />} />
        <Route path="/inbox" element={<InboxPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/answers" element={<AnswersPage />} />
      </Routes>
    </div>
  );
}
