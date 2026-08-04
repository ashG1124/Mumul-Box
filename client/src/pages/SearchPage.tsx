import { useState } from 'react';
import { Avatar } from '../components/Avatar';
import { Button } from '../components/Button';

// =====================================================================
// [정적 데이터] 06-search.html 시안과 동일한 9명의 유저 리스트
// =====================================================================
const SEARCH_RESULTS = [
  {
    id: 1, name: '여행유튜버J', handle: '@traveler-J',
    bio: '국내·해외 여행 콘텐츠 크리에이터. 진심 어린 질문 환영해요 ✈️ 매일 자정에 답변 모음 업로드합니다.',
    answers: 48, weekly: 12, isOnline: true, isVerified: true,
    gradient: 'from-[#C9B6FF] to-[#8961F4]' // v-bright
  },
  {
    id: 2, name: '여행작가민', handle: '@travel-writer-min',
    bio: '에세이·여행 칼럼 5년차. 혼행, 도시 산책, 책에서 본 풍경 따라가기. 무엇이든 물어보세요.',
    answers: 36, weekly: 9, isOnline: true, isVerified: false,
    gradient: 'from-[#FF9FE0] to-[#B570F4]' // v-pink
  },
  {
    id: 3, name: '여행덕후이', handle: '@travelnerd-lee',
    bio: '월 1회 해외, 주 1회 국내. 가성비 항공권 분석이 특기. 마일리지 쓰는 법 자주 받아요.',
    answers: 29, weekly: 4, isOnline: false, isVerified: false,
    gradient: 'from-[#8DCBFF] to-[var(--primary-600)]' // v-blue
  },
  {
    id: 4, name: '여행PD박', handle: '@travel-pd-park',
    bio: '전직 방송 PD. 로케이션·취재 동선 짜기 노하우 공유. 영상 만들기 관련 질문도 받습니다.',
    answers: 62, weekly: 7, isOnline: true, isVerified: true,
    gradient: 'from-[#9EE7D8] to-[#22C29A]' // v-mint
  },
  {
    id: 5, name: '백패커여행', handle: '@backpacker-trip',
    bio: '동남아 6개월 백패킹 경험. 저예산 여행과 비자, 안전한 숙소 찾는 법을 자주 답해요.',
    answers: 18, weekly: 2, isOnline: false, isVerified: false,
    gradient: 'from-[#FFD66B] to-[#FF8E47]' // v-amber
  },
  {
    id: 6, name: '국내여행지킴', handle: '@domestic-keeper',
    bio: '제주·강원·전라 위주 국내 여행 정보. 숨은 카페·전망대를 매주 한 곳씩 소개합니다.',
    answers: 41, weekly: 6, isOnline: true, isVerified: false,
    gradient: 'from-[var(--primary-400)] to-[var(--primary-600)]' // v-main
  },
  {
    id: 7, name: '여행스타그램', handle: '@travelstagram',
    bio: '감성 사진 + 풍경 위주 콘텐츠. 카메라/필름룩 보정 노하우 공유합니다.',
    answers: 22, weekly: 3, isOnline: false, isVerified: false,
    gradient: 'from-[#FFB6E1] to-[var(--primary-300)]' // default
  },
  {
    id: 8, name: '호캉스여신', handle: '@hotel-cation',
    bio: '전국 호텔 80곳 이상 투숙. 가성비/뷰/조식 기준으로 호텔을 추천드려요.',
    answers: 14, weekly: 1, isOnline: false, isVerified: false,
    gradient: 'from-[#FF9FE0] to-[#B570F4]' // v-pink
  },
  {
    id: 9, name: '여행메이트구함', handle: '@travel-buddy',
    bio: '동행 여행 + 모임 운영. 첫 해외 여행자에게 안전 동행 정보를 자주 안내합니다.',
    answers: 8, weekly: 2, isOnline: true, isVerified: false,
    gradient: 'from-[#C9B6FF] to-[#8961F4]' // v-bright
  },
];

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('여행');

  return (
    <main className="max-w-[1280px] mx-auto p-[36px_32px_120px]">
      
      {/* 1. Breadcrumb */}
      <div className="flex items-center gap-[10px] text-[13px] font-semibold text-[var(--text-500)] mb-[20px]">
        <a href="/" className="hover:text-[var(--primary-600)] transition-colors">홈</a>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[14px] h-[14px] opacity-60"><path d="m9 18 6-6-6-6"/></svg>
        <span className="font-bold text-[var(--text-900)]">유저 검색 결과</span>
      </div>

      {/* 2. Search Hero */}
      <section className="bg-white border border-[var(--border-2)] rounded-[var(--r-xl)] p-[28px_32px] shadow-[var(--shadow-sm)] mb-[28px]">
        <h1 className="m-0 mb-[4px] text-[22px] font-extrabold text-[var(--text-900)] tracking-[-0.01em]">
          "<span className="bg-gradient-to-r from-[var(--primary-400)] to-[var(--primary-600)] text-transparent bg-clip-text">여행</span>" 닉네임으로 유저 찾기
        </h1>
        <p className="m-0 mb-[18px] text-[14px] text-[var(--text-500)]">
          총 <strong className="text-[var(--primary-700)]">23명</strong>의 유저가 검색되었어요. 카드를 클릭하면 해당 유저의 질문함으로 이동합니다.
        </p>

        {/* 굵은 보라색 테두리와 후광 효과가 들어간 커스텀 검색바 */}
        <form 
          className="flex items-center gap-[10px] h-[56px] pl-[22px] pr-[8px] bg-white border-2 border-[var(--primary-300)] rounded-[var(--r-full)] shadow-[0_0_0_6px_var(--primary-50)]"
          onSubmit={(e) => e.preventDefault()}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[20px] h-[20px] text-[var(--primary-500)] shrink-0">
            <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="닉네임 입력 (예: 별빛익명)"
            className="flex-1 h-full border-0 outline-none bg-transparent text-[15px] font-semibold text-[var(--text-900)] placeholder-[var(--text-400)]"
          />
          <button type="button" onClick={() => setSearchQuery('')} className="w-[32px] h-[32px] rounded-full text-[var(--text-500)] flex items-center justify-center transition-colors hover:bg-[var(--primary-50)] hover:text-[var(--primary-600)]" aria-label="검색어 지우기">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[16px] h-[16px]"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
          <button type="submit" className="h-[42px] px-[20px] rounded-[var(--r-full)] bg-gradient-to-r from-[var(--primary-400)] to-[var(--primary-600)] text-white shadow-[var(--shadow-brand)] text-[14px] font-bold flex items-center gap-[8px] hover:-translate-y-[1px] transition-transform">
            검색
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="w-[14px] h-[14px]"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
          </button>
        </form>

        {/* 추천 키워드 */}
        <div className="flex flex-wrap items-center gap-[8px] mt-[14px] text-[13px] text-[var(--text-500)]">
          <b className="font-bold text-[var(--text-900)] mr-[4px]">추천 키워드</b>
          {['#여행유튜버', '#백패커', '#호캉스', '#해외여행', '#국내여행'].map(keyword => (
            <span key={keyword} className="p-[5px_12px] rounded-[var(--r-full)] bg-[var(--primary-50)] text-[var(--primary-700)] border border-[var(--primary-100)] text-[12px] font-bold cursor-pointer transition-colors hover:bg-[var(--primary-100)]">
              {keyword}
            </span>
          ))}
        </div>
      </section>

      {/* 3. Toolbar (오직 결과 카운트만!) */}
      <div className="flex justify-between items-center mb-[18px] flex-wrap gap-[12px]">
        <div className="text-[14px] font-semibold text-[var(--text-500)]">
          <strong className="text-[15px] font-extrabold text-[var(--text-900)]">23명</strong>의 유저
        </div>
      </div>

      {/* 4. User Cards Grid */}
      <section className="grid grid-cols-3 gap-[18px]">
        {SEARCH_RESULTS.map((user) => (
          <article 
            key={user.id}
            className="group relative bg-white border border-[var(--border-2)] rounded-[var(--r-lg)] p-[24px] flex flex-col gap-[14px] cursor-pointer overflow-hidden transition-all duration-[180ms] hover:border-[var(--primary-400)] hover:-translate-y-[3px] hover:shadow-[var(--shadow-md)]"
          >
            {/* 호버 시 상단 보라색 그라데이션 보더 효과 */}
            <div className="absolute inset-x-0 top-0 h-[6px] bg-gradient-to-r from-[var(--primary-400)] to-[var(--primary-600)] opacity-0 group-hover:opacity-100 transition-opacity duration-[180ms]" />

            {/* 온라인 초록색 점 */}
            {user.isOnline && (
              <span className="absolute top-[24px] right-[24px] w-[10px] h-[10px] rounded-full bg-[var(--success)] shadow-[0_0_0_3px_rgba(34,194,154,0.18)]" title="활동중" />
            )}

            <div className="flex items-start gap-[14px]">
              {/* 다양한 배경색을 가진 아바타 */}
              <Avatar hasImg={false} size={60} className={`border-[2px] border-white shadow-[var(--shadow-sm)] bg-gradient-to-br ${user.gradient}`} />
              <div>
                <h3 className="m-0 mb-[2px] flex items-center gap-[6px] flex-wrap text-[16px] font-extrabold text-[var(--text-900)] tracking-[-0.01em]">
                  {user.name}
                  {/* 인증된 유저 마크 */}
                  {user.isVerified && (
                    <span className="text-[var(--primary-500)]" title="인증된 유저">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[14px] h-[14px]"><path d="M12 1l2.39 4.84L20 7l-4 3.9L17 17l-5-2.6L7 17l1-6.1L4 7l5.61-1.16L12 1z"/></svg>
                    </span>
                  )}
                </h3>
                <div className="text-[12.5px] font-semibold text-[var(--text-500)]" style={{ fontFamily: "'SF Mono', ui-monospace, monospace" }}>
                  {user.handle}
                </div>
              </div>
            </div>

            <p className="m-0 text-[13.5px] text-[var(--text-900)] leading-[1.55] line-clamp-2">
              {user.bio}
            </p>

            <div className="grid grid-cols-2 py-[14px] border-y border-[var(--border-1)] mt-auto">
              <div className="text-center border-r border-[var(--border-1)]">
                <div className="text-[16px] font-extrabold text-[var(--text-900)] tracking-[-0.01em]">{user.answers}</div>
                <div className="text-[11px] font-semibold text-[var(--text-500)] mt-[2px]">답변 완료</div>
              </div>
              <div className="text-center">
                <div className="text-[16px] font-extrabold text-[var(--text-900)] tracking-[-0.01em]">{user.weekly}</div>
                <div className="text-[11px] font-semibold text-[var(--text-500)] mt-[2px]">이번 주</div>
              </div>
            </div>

            <div className="flex gap-[8px]">
              {/* Button 컴포넌트 재사용 */}
              <Button variant="primary" className="flex-1 !h-[38px] !text-[13px]" href="/qbox">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[14px] h-[14px]"><path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4 20-7z"/></svg>
                질문 보내기
              </Button>
              <Button variant="outline" className="flex-1 !h-[38px] !text-[13px]" href="/qbox">
                프로필
              </Button>
            </div>
          </article>
        ))}
      </section>

      {/* 5. Pagination */}
      <div className="flex items-center justify-center gap-[6px] my-[32px]">
        <button disabled className="min-w-[38px] h-[38px] px-[12px] rounded-[10px] bg-white border border-[var(--border-2)] text-[13.5px] font-bold text-[var(--text-900)] opacity-40 cursor-not-allowed">‹ 이전</button>
        <button className="min-w-[38px] h-[38px] px-[12px] rounded-[10px] bg-[var(--primary-500)] text-white text-[13.5px] font-bold shadow-[var(--shadow-brand)]">1</button>
        <button className="min-w-[38px] h-[38px] px-[12px] rounded-[10px] bg-white border border-[var(--border-2)] text-[13.5px] font-bold text-[var(--text-900)] hover:border-[var(--primary-400)] hover:text-[var(--primary-600)] transition-colors">2</button>
        <button className="min-w-[38px] h-[38px] px-[12px] rounded-[10px] bg-white border border-[var(--border-2)] text-[13.5px] font-bold text-[var(--text-900)] hover:border-[var(--primary-400)] hover:text-[var(--primary-600)] transition-colors">3</button>
        <button className="min-w-[38px] h-[38px] px-[12px] rounded-[10px] bg-white border border-[var(--border-2)] text-[13.5px] font-bold text-[var(--text-900)] hover:border-[var(--primary-400)] hover:text-[var(--primary-600)] transition-colors">다음 ›</button>
      </div>

      {/* 6. Empty state (결과 0건) */}
      <details className="mt-[24px] group">
        <summary className="cursor-pointer text-[13px] text-[var(--text-500)] font-semibold inline-flex items-center gap-[6px] hover:text-[var(--primary-600)] transition-colors outline-none list-none [&::-webkit-details-marker]:hidden">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[14px] h-[14px] transition-transform group-open:rotate-90"><path d="m9 18 6-6-6-6"/></svg>
          📐 (참고) 검색 결과 0건 빈 상태 보기
        </summary>
        <div className="bg-white border border-dashed border-[var(--border-2)] rounded-[var(--r-lg)] p-[60px_32px] text-center my-[24px]">
          <div className="w-[72px] h-[72px] mx-auto mb-[16px] rounded-[24px] bg-gradient-to-br from-[#F4F0FE] to-[#FFE4F3] flex items-center justify-center text-[32px]">
            🔍
          </div>
          <h3 className="m-0 mb-[6px] text-[18px] font-extrabold text-[var(--text-900)] tracking-[-0.01em]">일치하는 유저를 찾지 못했어요</h3>
          <p className="m-0 mb-[18px] text-[14px] text-[var(--text-500)]">다른 키워드로 검색해보거나, 추천 키워드를 눌러 탐색해보세요.</p>
          <div className="flex flex-wrap items-center justify-center gap-[8px]">
            {['#여행', '#디자인', '#커리어', '#운동'].map(keyword => (
              <span key={keyword} className="p-[5px_12px] rounded-[var(--r-full)] bg-[var(--primary-50)] text-[var(--primary-700)] border border-[var(--primary-100)] text-[12px] font-bold cursor-pointer transition-colors hover:bg-[var(--primary-100)]">
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </details>

    </main>
  );
}