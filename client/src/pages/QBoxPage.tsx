import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from '../components/Avatar';
import { Button } from '../components/Button';

// =====================================================================
// [정적 데이터] Q&A 히스토리 리스트
// =====================================================================
const QA_HISTORY = [
  {
    id: 1,
    q: '유럽 한 달 살기 추천 도시 있을까요?',
    a: 'A. 포르투갈 포르투를 강력 추천해요. 비용·날씨·치안 모두 좋고 영어가 통합니다. 일주일 단위로 옮기지 말고 한 도시에 길게 머무는 게 핵심이에요.',
    date: '2026-05-01',
  },
  {
    id: 2,
    q: '제주도 동선은 어떻게 짜야 효율적인가요?',
    a: 'A. 하루에 1지역(동/서/남)만 도는 게 정답이에요. 이동 시간이 줄어드는 만큼 카페·맛집·뷰 포인트를 충분히 즐길 수 있습니다.',
    date: '2026-04-20',
  },
  {
    id: 3,
    q: '여행 영상 편집은 어떤 프로그램 쓰세요?',
    a: 'A. 가볍게는 CapCut, 본격적으로는 DaVinci Resolve 무료 버전을 추천합니다. 컬러그레이딩 기능이 무료 툴 중 최고 수준이에요.',
    date: '2026-04-07',
  },
  {
    id: 4,
    q: '혼자 떠나는 첫 해외여행, 어디가 좋을까요?',
    a: 'A. 일본 후쿠오카 or 대만 타이베이. 한국어 메뉴가 많고 거리가 가까워서 위기 상황 대응이 쉽습니다. 4박 5일이 가장 균형 잡힌 일정이에요.',
    date: '2026-03-25',
  },
  {
    id: 5,
    q: '여행지 정할 때 가장 먼저 고려하는 건 뭐예요?',
    a: 'A. 1) 직항 가능 여부 2) 안전 등급 3) 1일 평균 식비. 이 세 가지를 점수화해서 정합니다. 인스타 사진 보고 결정하면 후회해요 ㅠㅠ',
    date: '2026-03-10',
  },
];

export default function QBoxPage() {
  // 상태 관리: 텍스트 입력 및 익명 체크박스
  const [qText, setQText] = useState('');
  const [isAnon, setIsAnon] = useState(true);

  // 500자 초과 여부 확인
  const isOverLimit = qText.length > 500;

  return (
    <main className="max-w-[1280px] mx-auto px-[32px] pt-[32px] pb-[120px]">
      {/* ============================================================
          1. Breadcrumb (경로 안내)
          ============================================================ */}
      <div className="flex items-center gap-[10px] text-[13px] font-semibold text-[var(--text-500)] mb-[24px]">
        <Link
          to="/"
          className="hover:text-[var(--primary-600)] transition-colors"
        >
          홈
        </Link>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-[14px] h-[14px] opacity-60"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
        <Link
          to="/search"
          className="hover:text-[var(--primary-600)] transition-colors"
        >
          유저 검색
        </Link>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-[14px] h-[14px] opacity-60"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
        <span className="font-bold text-[var(--text-900)]">
          @traveler-J 의 질문함
        </span>
      </div>

      {/* ============================================================
          2. 레이아웃 분할 (좌측 380px / 우측 1fr)
          ============================================================ */}
      <div className="grid grid-cols-[380px_1fr] gap-[32px] items-start">
        {/* === 좌측: 프로필 + 질문 작성 폼 (Sticky) === */}
        <aside className="sticky top-[104px] flex flex-col gap-[20px]">
          {/* 프로필 카드 */}
          <div className="bg-[var(--surface)] border border-[var(--border-2)] rounded-[var(--r-lg)] p-[28px_28px_24px] shadow-[var(--shadow-sm)] text-center relative overflow-hidden">
            {/* 상단 핑크/보라 그라데이션 장식 */}
            <div className="absolute top-0 left-0 right-0 h-[120px] bg-gradient-to-br from-[#FF9FE0] to-[#B570F4] opacity-[0.18] z-0 pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center">
              <Avatar
                hasImg={true}
                size={96}
                className="border-[3px] border-white shadow-[var(--shadow-md)] mb-[14px]"
              />
              <h2 className="text-[22px] font-extrabold text-[var(--text-900)] tracking-[-0.02em] m-0 mb-[4px]">
                여행유튜버J
              </h2>
              <p className="text-[13.5px] text-[var(--text-500)] m-0 mb-[16px] leading-[1.5]">
                국내·해외 여행 콘텐츠. 진심 어린 질문 환영해요 ✈️
              </p>

              <div className="grid grid-cols-2 w-full border-y border-[var(--border-1)] py-[14px] mb-[16px]">
                <div>
                  <div className="text-[18px] font-extrabold text-[var(--text-900)] tracking-[-0.01em]">
                    12
                  </div>
                  <div className="text-[11.5px] font-semibold text-[var(--text-500)] mt-[2px]">
                    답변 대기
                  </div>
                </div>
                <div>
                  <div className="text-[18px] font-extrabold text-[var(--text-900)] tracking-[-0.01em]">
                    48
                  </div>
                  <div className="text-[11.5px] font-semibold text-[var(--text-500)] mt-[2px]">
                    답변 완료
                  </div>
                </div>
              </div>

              <div className="flex w-full">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 w-full !h-[36px]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="w-[16px] h-[16px]"
                  >
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13" />
                  </svg>
                  이 질문함 공유하기
                </Button>
              </div>
            </div>
          </div>

          {/* 질문 작성 폼 카드 */}
          <div className="bg-[var(--surface)] border border-[var(--border-2)] rounded-[var(--r-lg)] p-[24px] shadow-[var(--shadow-sm)]">
            <div className="flex items-center gap-[10px] mb-[14px]">
              <div className="w-[36px] h-[36px] rounded-[var(--r-md)] bg-gradient-to-br from-[var(--primary-400)] to-[var(--primary-600)] flex items-center justify-center text-white shadow-[var(--shadow-brand)] shrink-0">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-[18px] h-[18px]"
                >
                  <path d="M22 2 11 13" />
                  <path d="M22 2 15 22l-4-9-9-4 20-7z" />
                </svg>
              </div>
              <div>
                <h4 className="m-0 text-[16px] font-extrabold text-[var(--text-900)] tracking-[-0.01em]">
                  질문 보내기
                </h4>
                <p className="m-0 text-[12.5px] text-[var(--text-500)]">
                  이 유저에게 익명으로 질문을 전달합니다.
                </p>
              </div>
            </div>

            <textarea
              value={qText}
              onChange={(e) => setQText(e.target.value)}
              placeholder="무엇이든 물어보세요. 구체적으로 작성할수록 답변 품질이 올라가요."
              className="w-full min-h-[140px] p-[14px_16px] resize-y bg-[var(--surface)] border border-[var(--border-2)] rounded-[var(--r-md)] text-[14px] leading-[1.6] text-[var(--text-900)] outline-none placeholder-[var(--text-400)] transition-all focus:border-[var(--primary-500)] focus:ring-[4px] focus:ring-[var(--primary-50)]"
            />

            <div
              className={`flex justify-between items-center mt-[10px] text-[12px] font-semibold ${isOverLimit ? 'text-[var(--danger)]' : 'text-[var(--text-500)]'}`}
            >
              <span>💡 욕설·개인정보는 자동 필터링됩니다.</span>
              <span>{qText.length} / 500</span>
            </div>

            <div
              className="flex items-center gap-[10px] my-[14px] mb-[16px] p-[12px_14px] bg-[var(--primary-50)] border border-[var(--primary-100)] rounded-[var(--r-md)] cursor-pointer select-none"
              onClick={() => setIsAnon(!isAnon)}
            >
              {/* 커스텀 체크박스 */}
              <div
                className={`w-[18px] h-[18px] rounded-[5px] flex items-center justify-center shrink-0 transition-colors duration-150 ${
                  isAnon
                    ? 'bg-gradient-to-br from-[var(--primary-400)] to-[var(--primary-600)]'
                    : 'bg-white border-2 border-[var(--primary-400)]'
                }`}
              >
                {isAnon && (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="3"
                    className="w-[12px] h-[12px]"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <div className="flex flex-col cursor-pointer">
                <span className="text-[13px] font-bold text-[var(--primary-700)]">
                  익명으로 보내기
                </span>
                <span className="text-[11.5px] font-medium text-[var(--primary-600)] mt-[2px]">
                  발신자 정보(IP·계정)는 서버에 저장하지 않아요.
                </span>
              </div>
            </div>

            <Button variant="primary" className="w-full !h-[48px]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-[16px] h-[16px]"
              >
                <path d="M22 2 11 13" />
                <path d="M22 2 15 22l-4-9-9-4 20-7z" />
              </svg>
              질문 보내기
            </Button>
          </div>
        </aside>

        {/* === 우측: Q&A 히스토리 영역 === */}
        <section>
          {/* 패널 헤더 */}
          <div className="bg-[var(--surface)] border border-[var(--border-2)] rounded-[var(--r-lg)] shadow-[var(--shadow-sm)] p-[20px_24px] mb-[20px]">
            <div className="flex justify-between items-end">
              <div>
                <h3 className="m-0 mb-[4px] text-[18px] font-extrabold text-[var(--text-900)] tracking-[-0.01em]">
                  📚 Q&A 히스토리
                </h3>
                <p className="m-0 text-[13px] text-[var(--text-500)]">
                  이 유저가 답변을 완료한 질문만 공개됩니다.
                </p>
              </div>
              <div className="text-[13px] font-semibold text-[var(--text-500)]">
                총{' '}
                <strong className="text-[14px] font-extrabold text-[var(--text-900)]">
                  48
                </strong>
                개의 답변
              </div>
            </div>
          </div>

          {/* Q&A 리스트 */}
          <div className="flex flex-col gap-[14px]">
            {QA_HISTORY.map((item) => (
              <article
                key={item.id}
                className="grid grid-cols-[1fr_auto] gap-[20px] items-start bg-[var(--surface)] border border-[var(--border-2)] rounded-[var(--r-lg)] p-[22px_24px] cursor-pointer transition-all duration-[180ms] ease-out hover:border-[var(--primary-400)] hover:-translate-y-[1px] hover:shadow-[var(--shadow-md)]"
              >
                <div>
                  <span className="inline-flex items-center gap-[4px] p-[3px_10px] rounded-[var(--r-full)] bg-[var(--surface-2)] text-[var(--text-500)] text-[11.5px] font-bold mb-[8px]">
                    <span className="text-[10px]">🔒</span> 익명 질문
                  </span>
                  <h4 className="m-0 mb-[10px] text-[15.5px] font-extrabold text-[var(--text-900)] tracking-[-0.01em] leading-[1.4]">
                    {item.q}
                  </h4>
                  <p className="m-0 text-[13.5px] text-[var(--text-900)] leading-[1.55] line-clamp-2">
                    {item.a}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-[6px] min-w-[80px]">
                  <span className="inline-flex items-center gap-[4px] h-[24px] px-[10px] rounded-[var(--r-full)] text-[11.5px] font-bold bg-[#22C29A]/10 text-[#0E8C68]">
                    ● 답변 완료
                  </span>
                  <span className="text-[11.5px] font-semibold text-[var(--text-400)]">
                    {item.date}
                  </span>
                </div>
              </article>
            ))}
          </div>

          <div className="flex justify-center mt-[22px]">
            <Button variant="outline" to="/answers">
              전체 답변 48개 보기
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
