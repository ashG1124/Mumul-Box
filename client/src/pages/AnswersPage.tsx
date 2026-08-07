import { Link } from 'react-router-dom';
import { Avatar } from '../components/Avatar';
import { Button } from '../components/Button';

// =====================================================================
// [정적 데이터] 07-answers.html 시안과 동일한 10개의 Q&A 데이터
// =====================================================================
const ANSWERS_DATA = [
  {
    id: 1,
    q: '유럽 한 달 살기 추천 도시 있을까요?',
    a: 'A. 포르투갈 포르투를 강력 추천해요. 비용·날씨·치안 모두 좋고 영어가 통합니다. 일주일 단위로 옮기지 말고 한 도시에 길게 머무는 게 핵심이에요. 짐 싸고 푸는 데 쓰는 시간이 생각보다 여행 만족도를 크게 깎아먹거든요.',
    date: '2026-05-01',
  },
  {
    id: 2,
    q: '제주도 동선은 어떻게 짜야 효율적인가요?',
    a: 'A. 하루에 1지역(동/서/남)만 도는 게 정답이에요. 이동 시간이 줄어드는 만큼 카페·맛집·뷰 포인트를 충분히 즐길 수 있습니다. 렌터카 기준 하루 80km 이상 잡으면 거의 운전만 하다 끝나요.',
    date: '2026-04-20',
  },
  {
    id: 3,
    q: '여행 영상 편집은 어떤 프로그램 쓰세요?',
    a: 'A. 가볍게는 CapCut, 본격적으로는 DaVinci Resolve 무료 버전을 추천합니다. 컬러그레이딩 기능이 무료 툴 중 최고 수준이에요. 처음엔 컷 편집만 익히고, 색 보정은 나중에 천천히 배워도 됩니다.',
    date: '2026-04-07',
  },
  {
    id: 4,
    q: '혼자 떠나는 첫 해외여행, 어디가 좋을까요?',
    a: 'A. 일본 후쿠오카 or 대만 타이베이. 한국어 메뉴가 많고 거리가 가까워서 위기 상황 대응이 쉽습니다. 4박 5일이 가장 균형 잡힌 일정이에요. 너무 짧으면 적응만 하다 끝나고, 너무 길면 외로워집니다.',
    date: '2026-03-25',
  },
  {
    id: 5,
    q: '여행지 정할 때 가장 먼저 고려하는 건 뭐예요?',
    a: 'A. 1) 직항 가능 여부 2) 안전 등급 3) 1일 평균 식비. 이 세 가지를 점수화해서 정합니다. 인스타 사진 보고 결정하면 후회해요. 사진은 가장 예쁜 순간만 담으니까요.',
    date: '2026-03-10',
  },
  {
    id: 6,
    q: '장기 여행 중 환전·카드는 어떻게 관리하세요?',
    a: 'A. 현금은 최소한만 들고, 해외 결제 수수료 없는 카드 2장을 메인/예비로 나눠 씁니다. 한 장은 숙소에 보관해요. 분실 시 하루 만에 여행이 멈추지 않게 하는 게 핵심입니다.',
    date: '2026-02-28',
  },
  {
    id: 7,
    q: '여행 짐은 어떻게 줄이세요? 늘 캐리어가 터져요',
    a: 'A. "현지에서 살 수 있는 건 안 가져간다"가 원칙이에요. 옷은 3일치만 챙기고 빨래를 합니다. 캐리어 무게의 절반은 \'혹시 몰라서\' 넣은 것들이에요.',
    date: '2026-02-15',
  },
  {
    id: 8,
    q: '여행 브이로그 조회수가 안 나와요. 뭐가 문제일까요?',
    a: "A. 대부분 '도착까지가 너무 길어서'예요. 첫 15초 안에 가장 좋은 장면을 보여주세요. 출발 준비·공항·기내식은 과감히 줄이고, 목적지의 하이라이트부터 시작하는 편집이 훨씬 잘 됩니다.",
    date: '2026-02-03',
  },
  {
    id: 9,
    q: '겨울 여행지 추천해주세요. 따뜻한 곳으로요',
    a: 'A. 동남아 중에서도 베트남 다낭/푸꾸옥을 추천해요. 12~2월이 건기라 비가 거의 안 오고, 직항이 많아 항공권도 합리적입니다. 휴양과 도시 관광을 둘 다 잡기 좋아요.',
    date: '2026-01-22',
  },
  {
    id: 10,
    q: '여행 다녀오면 늘 현실 복귀가 힘들어요. 어떻게 하세요?',
    a: "A. 마지막 날을 '여행지에서 쉬는 날'이 아니라 '집에서 쉬는 날'로 비워둬요. 도착 다음 날 바로 출근하면 후폭풍이 큽니다. 하루의 완충 구간을 일정에 미리 넣어두세요.",
    date: '2026-01-09',
  },
];

export default function AnswersPage() {
  return (
    <main className="max-w-[920px] mx-auto p-[32px_32px_120px]">
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
        <Link
          to="/qbox"
          className="hover:text-[var(--primary-600)] transition-colors"
        >
          @traveler-J 의 질문함
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
        <span className="font-bold text-[var(--text-900)]">전체 답변</span>
      </div>

      {/* ============================================================
          2. 페이지 헤더 (프로필 정보 박스)
          ============================================================ */}
      <section className="bg-white border border-[var(--border-2)] rounded-[var(--r-lg)] p-[24px_28px] shadow-[var(--shadow-sm)] mb-[24px] flex items-center gap-[18px]">
        {/* 그라데이션 아바타 공통 컴포넌트 재사용 */}
        <Avatar
          hasImg={false}
          size={56}
          className="bg-gradient-to-br from-[#FFB6E1] to-[var(--primary-300)] border-[2px] border-white shadow-[var(--shadow-sm)]"
        />

        <div className="flex-1">
          <h1 className="m-0 mb-[4px] text-[20px] font-extrabold text-[var(--text-900)] tracking-[-0.01em]">
            여행유튜버J
            <span
              className="text-[14px] font-semibold text-[var(--text-500)] ml-[8px]"
              style={{ fontFamily: "'SF Mono', ui-monospace, monospace" }}
            >
              @traveler-J
            </span>
          </h1>
          <p className="m-0 text-[13.5px] text-[var(--text-500)]">
            지금까지 등록한 답변{' '}
            <strong className="font-extrabold text-[var(--primary-700)]">
              48개
            </strong>{' '}
            · 최신순으로 정렬됩니다.
          </p>
        </div>

        <Button variant="primary" to="/qbox" className="!h-[44px]">
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
      </section>

      {/* ============================================================
          3. 리스트 헤더 (제목 & 카운트)
          ============================================================ */}
      <div className="flex items-baseline justify-between mb-[14px]">
        <h2 className="m-0 text-[16px] font-extrabold text-[var(--text-900)] tracking-[-0.01em]">
          📚 전체 답변
        </h2>
        <span className="text-[12.5px] font-semibold text-[var(--text-500)]">
          1–10 / 48
        </span>
      </div>

      {/* ============================================================
          4. 질문 & 답변 리스트
          ============================================================ */}
      <section className="flex flex-col gap-[14px] mb-[32px]">
        {ANSWERS_DATA.map((item) => (
          <article
            key={item.id}
            className="grid grid-cols-[1fr_auto] gap-[24px] items-start bg-white border border-[var(--border-2)] rounded-[var(--r-lg)] p-[24px_26px] cursor-pointer transition-all duration-[180ms] hover:border-[var(--primary-400)] hover:-translate-y-[1px] hover:shadow-[var(--shadow-md)]"
          >
            <div>
              <span className="inline-flex items-center gap-[4px] px-[10px] py-[3px] rounded-[var(--r-full)] bg-[var(--surface-2)] text-[var(--text-500)] text-[11.5px] font-bold mb-[10px]">
                <span className="text-[10px]">🔒</span> 익명 질문
              </span>
              <h3 className="m-0 mb-[10px] text-[16px] font-extrabold text-[var(--text-900)] tracking-[-0.01em] leading-[1.4]">
                {item.q}
              </h3>
              <p className="m-0 text-[14px] text-[var(--text-900)] leading-[1.65] line-clamp-3">
                {item.a}
              </p>
            </div>

            <div className="flex flex-col items-end gap-[6px] min-w-[90px]">
              <span className="inline-flex items-center gap-[4px] h-[24px] px-[10px] rounded-[var(--r-full)] text-[11.5px] font-bold bg-[rgba(34,194,154,0.12)] text-[#0E8C68]">
                ● 답변 완료
              </span>
              <span className="text-[11.5px] font-semibold text-[var(--text-400)]">
                {item.date}
              </span>
            </div>
          </article>
        ))}
      </section>

      {/* ============================================================
          5. 페이지네이션
          ============================================================ */}
      <div className="flex items-center justify-center gap-[6px]">
        <button
          disabled
          className="min-w-[38px] h-[38px] px-[12px] rounded-[10px] bg-white border border-[var(--border-2)] text-[13.5px] font-bold text-[var(--text-900)] opacity-40 cursor-not-allowed"
        >
          ‹ 이전
        </button>
        <button className="min-w-[38px] h-[38px] px-[12px] rounded-[10px] bg-[var(--primary-500)] text-white text-[13.5px] font-bold shadow-[var(--shadow-brand)] border-transparent">
          1
        </button>
        {/* 2부터 5까지 반복 생성 */}
        {[2, 3, 4, 5].map((num) => (
          <button
            key={num}
            className="min-w-[38px] h-[38px] px-[12px] rounded-[10px] bg-white border border-[var(--border-2)] text-[13.5px] font-bold text-[var(--text-900)] hover:border-[var(--primary-400)] hover:text-[var(--primary-600)] transition-colors"
          >
            {num}
          </button>
        ))}
        <button className="min-w-[38px] h-[38px] px-[12px] rounded-[10px] bg-white border border-[var(--border-2)] text-[13.5px] font-bold text-[var(--text-900)] hover:border-[var(--primary-400)] hover:text-[var(--primary-600)] transition-colors">
          다음 ›
        </button>
      </div>
    </main>
  );
}
