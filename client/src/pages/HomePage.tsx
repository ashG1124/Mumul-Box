import { Avatar } from '../components/Avatar';
interface HomePageProps {
  isLoggedIn?: boolean;
}

// =====================================================================
// [정적 데이터] 최신 답변 피드
// =====================================================================
const FEED_DATA = [
  {
    id: 1,
    q: 'Q. 가장 좋아하는 여행지는?',
    from: '- 익명',
    a: 'A. 최근 다녀온 제주도 김녕 해변이 진짜 좋았어요. 새벽에 가서 일출 본 게 인생샷이었어요. 🌊',
    nickname: '여행유튜버J',
    date: '2026.05.12',
    avatarGradient: 'from-[var(--primary-300)] to-[var(--primary-500)]',
  },
  {
    id: 2,
    q: 'Q. 디자인 입문은 어떻게 시작?',
    from: '- 익명',
    a: 'A. 모방부터 시작하세요. 좋아하는 화면을 픽셀 단위로 따라 그려보면 감각이 빠르게 잡혀요.',
    nickname: '디자인공방',
    date: '2026.05.12',
    avatarGradient: 'from-[#FFB6E1] to-[var(--primary-300)]',
  },
  {
    id: 3,
    q: 'Q. 요즘 자주 듣는 노래는?',
    from: '- 익명',
    a: 'A. 최근엔 NewJeans "Supernatural" 무한 재생 중이에요. 출근길에 듣기 좋더라고요 🎵',
    nickname: '크리에이터닉',
    date: '2026.05.11',
    avatarGradient: 'from-[var(--primary-400)] to-[var(--primary-600)]',
  },
  {
    id: 4,
    q: 'Q. 번아웃 어떻게 극복했어요?',
    from: '- 익명',
    a: 'A. 일단 24시간 모든 알림을 꺼봤어요. 그리고 가벼운 산책 30분을 매일 강제로 넣었습니다.',
    nickname: '고민상담소',
    date: '2026.05.11',
    avatarGradient: 'from-[var(--info)] to-[var(--primary-500)]',
  },
];

export default function HomePage({ isLoggedIn = false }: HomePageProps) {
  return (
    <main className="w-full min-h-screen">      
      {/* ============================================================
          1. HERO 섹션
          ============================================================ */}
      <section className="max-w-[1280px] mx-auto pt-[72px] px-[32px] pb-[48px] grid grid-cols-[1.05fr_1fr] gap-[64px] items-center">
        
        {/* 좌측: 타이틀 및 검색 */}
        <div>
          <h1 className="text-[56px] font-extrabold tracking-[-0.03em] leading-[1.15] mb-[16px] text-[var(--text-900)]">
            <span className="bg-gradient-to-r from-[var(--primary-400)] to-[var(--primary-600)] text-transparent bg-clip-text">
              익명으로 묻고,
            </span>
            <br />
            진심으로 답하다
          </h1>
          
          {/* 로그인 상태에 따라 설명 텍스트가 바뀝니다 */}
          <p className="text-[17px] text-[var(--text-500)] mb-[36px] max-w-[440px] leading-[1.6]">
            {isLoggedIn ? (
              <>
                오늘도 누군가는 진심 어린 답변을 기다리고 있어요.<br />
                닉네임을 검색해 익명 질문을 남기거나, 내 질문함을 확인해 보세요.
              </>
            ) : (
              <>
                관심 있는 유저를 검색해 익명 질문을 남기거나,<br />
                로그인 없이 공개된 답변 피드를 둘러보세요.
              </>
            )}
          </p>

          {/* ★ 로그인 시에만 노출되는 환영 카드 (01-home-logged.html 반영) */}
          {isLoggedIn && (
            <div className="bg-[var(--surface)] border border-[var(--border-2)] rounded-[var(--r-lg)] p-[18px_22px] max-w-[460px] mb-[24px] flex items-center gap-[14px]">
              <Avatar hasImg={true} size={44} />
              <div className="flex-1">
                <h4 className="m-0 mb-[2px] text-[14px] font-extrabold text-[var(--text-900)]">
                  안녕하세요, 별빛익명님 👋
                </h4>
                <p className="m-0 text-[12px] text-[var(--text-500)]">
                  미답변 <strong className="text-[var(--primary-700)]">3개</strong>
                </p>
              </div>
            </div>
          )}

          <form className="flex items-center gap-[10px] w-full max-w-[460px] h-[60px] pl-[24px] pr-[8px] bg-[var(--surface)] border border-[var(--border-2)] rounded-[var(--r-full)]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-400)" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <input
              type="text"
              name="q"
              placeholder="닉네임으로 유저 찾기"
              className="flex-1 h-full border-0 outline-none bg-transparent text-[15px] text-[var(--text-900)] placeholder-[var(--text-400)]"
            />
            <button
              type="submit"
              className="h-[44px] px-[22px] rounded-[var(--r-full)] bg-[var(--primary-500)] text-white text-[14px] font-bold flex items-center gap-[8px] hover:bg-[var(--primary-600)] transition-colors"
            >
              검색
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="w-[14px] h-[14px]">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </button>
          </form>
        </div>

        {/* 우측: 채팅 버블 애니메이션 영역 */}
        <div className="relative min-h-[480px]">
          <div className="absolute top-[20px] left-[30px] bg-[var(--surface)] border border-[var(--border-2)] rounded-[var(--r-xl)] p-[18px_22px] max-w-[330px] shadow-sm">
            <div className="text-[13px] font-bold text-[var(--text-900)] mb-[6px] tracking-[-0.01em] leading-[1.45]">
              Q. 요즘 제일 좋아하는 노래는?
              <span className="inline-block ml-[6px] px-[8px] py-[2px] rounded-[var(--r-full)] bg-[var(--primary-50)] text-[var(--primary-700)] text-[11px] font-bold">익명</span>
            </div>
            <div className="flex items-center gap-[6px] mt-[8px] text-[11px] text-[var(--text-500)]">
              <span className="w-[18px] h-[18px] rounded-full bg-gradient-to-br from-[#FFB6E1] to-[var(--primary-300)]" /> 2026.05.10 · 1m ago
            </div>
          </div>
          <div className="absolute top-[120px] right-[40px] bg-[var(--primary-500)] text-white rounded-[var(--r-xl)] p-[18px_22px] max-w-[330px] shadow-[var(--shadow-brand)]">
            <div className="text-[13px] font-bold mb-[6px] tracking-[-0.01em] leading-[1.45]">
              A. 최근엔 NewJeans "Supernatural" 무한 재생 중이에요 🎵
            </div>
            <div className="flex items-center gap-[6px] mt-[8px] text-[11px] text-white/80">
              <span className="w-[18px] h-[18px] rounded-full bg-white/30" /> 크리에이터 닉네임 · 2m ago
            </div>
          </div>
          <div className="absolute top-[248px] left-[10px] bg-[var(--surface)] border border-[var(--border-2)] rounded-[var(--r-xl)] p-[18px_22px] max-w-[330px] shadow-sm">
            <div className="text-[13px] font-bold text-[var(--text-900)] mb-[6px] tracking-[-0.01em] leading-[1.45]">
              Q. 가장 좋아하는 여행지는 어디인가요?
              <span className="inline-block ml-[6px] px-[8px] py-[2px] rounded-[var(--r-full)] bg-[var(--primary-50)] text-[var(--primary-700)] text-[11px] font-bold">익명</span>
            </div>
            <div className="flex items-center gap-[6px] mt-[8px] text-[11px] text-[var(--text-500)]">
              <span className="w-[18px] h-[18px] rounded-full bg-gradient-to-br from-[#FFB6E1] to-[var(--primary-300)]" /> 2026.05.10 · 5m ago
            </div>
          </div>
          <div className="absolute top-[348px] right-[64px] bg-gradient-to-br from-[var(--primary-400)] to-[var(--primary-600)] text-white rounded-[var(--r-xl)] p-[18px_22px] max-w-[330px] shadow-[var(--shadow-md)]">
            <div className="text-[13px] font-bold mb-[6px] tracking-[-0.01em] leading-[1.45]">
              A. 최근 다녀온 제주도 김녕 해변이 진짜 좋았어요 🌊
            </div>
            <div className="flex items-center gap-[6px] mt-[8px] text-[11px] text-white/80">
              <span className="w-[18px] h-[18px] rounded-full bg-white/30" /> 여행유튜버J · 3m ago
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          2. 공개된 최신 답변 피드
          ============================================================ */}
      <section className="max-w-[1280px] mx-auto pt-[64px] px-[32px] pb-0">
        <div className="flex items-end justify-between mb-[24px]">
          <h2 className="text-[24px] font-extrabold tracking-[-0.02em] m-0 text-[var(--text-900)]">
            공개된 최신 답변 피드
          </h2>
          <span className="text-[13px] text-[var(--primary-600)] font-semibold cursor-pointer after:content-['_→'] hover:text-[var(--primary-700)]">
            더보기
          </span>
        </div>
        
        <div className="grid grid-cols-4 gap-[18px]">
          {FEED_DATA.map((item) => (
            <div
              key={item.id}
              className="bg-[var(--surface)] rounded-[var(--r-lg)] p-[22px] border border-[var(--border-2)] transition-all duration-[180ms] ease-out hover:border-[var(--primary-400)] hover:-translate-y-[2px] cursor-pointer flex flex-col shadow-sm hover:shadow-[var(--shadow-md)]"
            >
              <h3 className="text-[15px] font-extrabold text-[var(--text-900)] mb-[4px] tracking-[-0.01em] leading-[1.4] line-clamp-1">
                {item.q}
              </h3>
              <p className="text-[12px] text-[var(--text-500)] mb-[12px] font-semibold">
                {item.from}
              </p>
              <p className="text-[13.5px] text-[var(--text-900)] mb-[16px] leading-[1.6] line-clamp-3">
                {item.a}
              </p>
              
              <div className="mt-auto flex items-center justify-between pt-[12px] border-t border-[var(--border-1)] text-[12px] text-[var(--text-500)]">
                <span className="inline-flex items-center gap-[6px] font-semibold text-[var(--text-500)]">
                  <span className={`w-[20px] h-[20px] rounded-full shrink-0 bg-gradient-to-br ${item.avatarGradient}`} />
                  {item.nickname}
                </span>
                <span className="font-semibold">{item.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================
          3. 서비스 강점 (Feature Trio)
          ============================================================ */}
      <section className="max-w-[1280px] mx-auto pt-[64px] px-[32px] pb-0">
        <div className="bg-gradient-to-r from-[var(--primary-500)] to-[var(--primary-600)] rounded-[var(--r-lg)] p-[24px] grid grid-cols-3 gap-[8px] text-white shadow-[var(--shadow-brand)]">
          <div className="p-[8px_4px]">
            <div className="w-[36px] h-[36px] rounded-[12px] bg-white/20 border border-white/25 flex items-center justify-center mb-[10px]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[18px] h-[18px]">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h5 className="text-[13px] font-extrabold m-0 mb-[4px] tracking-[-0.01em]">완벽한 익명성 보장</h5>
            <p className="text-[11px] text-white/85 m-0 leading-[1.5]">닉네임 익명성 끝까지 안전 보장</p>
          </div>
          <div className="p-[8px_4px]">
            <div className="w-[36px] h-[36px] rounded-[12px] bg-white/20 border border-white/25 flex items-center justify-center mb-[10px]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[18px] h-[18px]">
                <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                <path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" />
              </svg>
            </div>
            <h5 className="text-[13px] font-extrabold m-0 mb-[4px] tracking-[-0.01em]">쉽고 빠른 공유</h5>
            <p className="text-[11px] text-white/85 m-0 leading-[1.5]">링크 한 번이면 무물 시작</p>
          </div>
          <div className="p-[8px_4px]">
            <div className="w-[36px] h-[36px] rounded-[12px] bg-white/20 border border-white/25 flex items-center justify-center mb-[10px]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[18px] h-[18px]">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <h5 className="text-[13px] font-extrabold m-0 mb-[4px] tracking-[-0.01em]">크리에이터 소통 최적화</h5>
            <p className="text-[11px] text-white/85 m-0 leading-[1.5]">팬과 소통하는 가장 빠른 방법</p>
          </div>
        </div>
      </section>

      {/* Footer 여백 */}
      <div className="h-[120px]" />
    </main>
  );
}