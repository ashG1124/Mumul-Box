import { useState } from 'react';
import { Button } from '../components/Button';

// =====================================================================
// [정적 데이터]
// =====================================================================
const PENDING_DATA = [
  { id: 1, text: '퇴근하고 운동 꾸준히 하는 비결이 뭔가요?', time: '1시간 전' },
  {
    id: 2,
    text: '처음 시작하는 방법이 막막한데 어떻게 시작했나요?',
    time: '3시간 전',
  },
  {
    id: 3,
    text: '어떤 선택이 맞을까요? 회사 vs 대학원 진학',
    time: '5시간 전',
  },
  { id: 4, text: '자주 추천하는 책이 있을까요?', time: '8시간 전' },
  { id: 5, text: '혼밥 추천 메뉴 있나요?', time: '12시간 전' },
  { id: 6, text: '봄 데이트 코스 알려주세요', time: '1일 전' },
  { id: 7, text: '홈 카페 입문, 어떤 도구가 좋을까요?', time: '1일 전' },
  { id: 8, text: '최근에 본 영화 중 인상 깊은 작품?', time: '2일 전' },
];

const ANSWERED_DATA = [
  {
    id: 1,
    text: '이직 준비, 회사 다니면서 어떻게 시간 냈어요?',
    ans: 'A. 평일 아침 1시간만 고정으로 썼어요. 퇴근 후엔 체력이 바닥이라 차라리 일찍 자고 새벽에 했습니다. 주말은 몰아서 하지 말고 2시간만.',
    date: '2026-05-12',
    statusText: '공개',
  },
  {
    id: 2,
    text: '번아웃 왔을 때 어떻게 회복했는지 궁금해요',
    ans: "A. 가장 효과 본 건 '아무것도 안 하는 시간'을 일정에 넣는 거였어요. 죄책감 없이 쉬는 연습이 필요했습니다.",
    date: '2026-05-10',
    statusText: '공개',
  },
  {
    id: 3,
    text: '포트폴리오에 사이드 프로젝트 꼭 필요한가요?',
    ans: 'A. 필수는 아니지만, 실무 경험이 적을수록 강력합니다. 완성도 높은 1개가 어설픈 3개보다 훨씬 낫습니다.',
    date: '2026-05-08',
    statusText: '링크 공개',
  },
];

const REPORTED_DATA = [
  {
    id: 1,
    type: '욕설/비속어',
    count: '신고 1회 · 내가 신고함',
    title: '질문에 욕설과 인신공격성 표현이 포함되어 있어요',
    quote:
      '"야 너 진짜 ●●● 같은데 그러고도 답변하는 척 …" — 자동 필터로 일부 마스킹된 원문',
    time: '신고일 2026-05-13 · 14:22',
    status: '운영자 검토 중',
    resolved: false,
  },
  {
    id: 2,
    type: '스팸/홍보',
    count: '신고 1회 · 자동 필터 감지',
    title: '외부 홍보 링크가 반복적으로 포함된 질문',
    quote: '"이거 보고 가입하면 적립금 줘요 → bit.ly/●●●● 진짜 꿀팁임 …"',
    time: '신고일 2026-05-13 · 09:05',
    status: '운영자 검토 중',
    resolved: false,
  },
  {
    id: 3,
    type: '개인정보 노출',
    count: '신고 2회 · 내가 신고함',
    title: '특정 인물의 연락처가 적힌 질문',
    quote: '"○○○님 번호 010-●●●●-●●●● 맞죠? 이 사람 어떻게 생각해요?"',
    time: '신고일 2026-05-11 · 18:40 · 운영자 처리 완료',
    status: '숨김 처리됨',
    resolved: true,
  },
];

// 거절 사유 옵션
const REJECT_REASONS = [
  { id: 'abuse', icon: '🚫', label: '욕설 / 비속어' },
  { id: 'spam', icon: '📢', label: '스팸 / 광고·홍보' },
  { id: 'privacy', icon: '🔒', label: '개인정보 노출' },
  { id: 'hate', icon: '😡', label: '혐오 / 차별 표현' },
  { id: 'decline', icon: '🙅', label: '단순 거절 — 답변하고 싶지 않아요' },
  { id: 'etc', icon: '✏️', label: '기타 사유' },
];

export default function InboxPage() {
  const [activeTab, setActiveTab] = useState<
    'pending' | 'answered' | 'reported'
  >('pending');
  const [selectedPendingId, setSelectedPendingId] = useState<number>(
    PENDING_DATA[0].id,
  );

  // 모달 상태 관리
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [rejectTargetText, setRejectTargetText] = useState('');
  const [rejectReasonId, setRejectReasonId] = useState<string | null>(null);

  const openRejectModal = (text: string) => {
    setRejectTargetText(text);
    setRejectReasonId(null);
    setIsRejectModalOpen(true);
  };

  const closeRejectModal = () => setIsRejectModalOpen(false);

  // 선택된 질문 찾기
  const selectedQuestion = PENDING_DATA.find((q) => q.id === selectedPendingId);

  return (
    <>
      <main className="max-w-[1280px] mx-auto pt-[40px] px-[32px] pb-[120px] grid grid-cols-[240px_1fr] gap-[40px] items-start">
        {/* ============================================================
            1. 사이드바 (내비게이션)
            ============================================================ */}
        <aside className="sticky top-[104px]">
          <div className="flex items-center gap-[10px] px-[12px] pb-[16px] mb-[8px] border-b border-[var(--border-1)]">
            <div className="w-[36px] h-[36px] rounded-[12px] bg-gradient-to-br from-[var(--primary-400)] to-[var(--primary-600)] flex items-center justify-center text-white shadow-[var(--shadow-brand)]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-[18px] h-[18px]"
              >
                <path d="M22 12h-6l-2 3h-4l-2-3H2" />
                <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
              </svg>
            </div>
            <h2 className="m-0 text-[18px] font-extrabold text-[var(--text-900)] tracking-[-0.01em]">
              내 질문함
            </h2>
          </div>

          <nav className="flex flex-col gap-[2px] pt-[8px]">
            <a
              href="#"
              className="flex items-center gap-[10px] h-[44px] px-[14px] rounded-[var(--r-md)] text-[14px] font-bold bg-[var(--primary-50)] text-[var(--primary-700)] transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-[18px] h-[18px]"
              >
                <path d="M22 12h-6l-2 3h-4l-2-3H2" />
                <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
              </svg>
              전체 보관함
              <span className="ml-auto min-w-[22px] h-[22px] px-[7px] rounded-[var(--r-full)] bg-[var(--primary-500)] text-white text-[11px] font-extrabold flex items-center justify-center">
                42
              </span>
            </a>
            <a
              href="#"
              className="flex items-center gap-[10px] h-[44px] px-[14px] rounded-[var(--r-md)] text-[14px] font-semibold text-[var(--text-500)] hover:bg-[var(--primary-50)] hover:text-[var(--primary-700)] transition-colors group"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-[18px] h-[18px]"
              >
                <path d="M12 8v4" />
                <path d="M12 16h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              미답변
              <span className="ml-auto min-w-[22px] h-[22px] px-[7px] rounded-[var(--r-full)] bg-[var(--primary-100)] text-[var(--primary-700)] text-[11px] font-extrabold flex items-center justify-center group-hover:bg-[var(--primary-200)]">
                8
              </span>
            </a>
            <a
              href="#"
              className="flex items-center gap-[10px] h-[44px] px-[14px] rounded-[var(--r-md)] text-[14px] font-semibold text-[var(--text-500)] hover:bg-[var(--primary-50)] hover:text-[var(--primary-700)] transition-colors group"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-[18px] h-[18px]"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
              답변 완료
              <span className="ml-auto min-w-[22px] h-[22px] px-[7px] rounded-[var(--r-full)] bg-[var(--primary-100)] text-[var(--primary-700)] text-[11px] font-extrabold flex items-center justify-center group-hover:bg-[var(--primary-200)]">
                34
              </span>
            </a>
          </nav>
        </aside>

        {/* ============================================================
            2. 메인 콘텐츠 영역
            ============================================================ */}
        <section>
          {/* 상단 헤더 박스 */}
          <div className="bg-gradient-to-br from-[#F4F0FE] to-[#FFE4F3] border border-[var(--border-1)] rounded-[var(--r-lg)] p-[28px_32px] mb-[24px] flex items-center gap-[24px]">
            <div className="w-[64px] h-[64px] rounded-[18px] bg-[var(--primary-500)] flex items-center justify-center shadow-[var(--shadow-brand)] shrink-0 text-white">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-[28px] h-[28px]"
              >
                <path d="M22 12h-6l-2 3h-4l-2-3H2" />
                <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
              </svg>
            </div>
            <div>
              <h1 className="m-0 mb-[4px] text-[22px] font-extrabold text-[var(--text-900)] tracking-[-0.01em]">
                익명 질문 보관함 관리
              </h1>
              <p className="m-0 text-[14px] text-[var(--text-500)]">
                받은 질문을 한 곳에 모았어요. 답변과 정리를 빠르게 처리하세요.
              </p>
            </div>
            <div className="ml-auto flex gap-[8px]">
              <div className="px-[18px] py-[12px] bg-white border border-[var(--border-2)] rounded-[var(--r-md)] text-center">
                <div className="text-[20px] font-extrabold text-[var(--text-900)] tracking-[-0.01em]">
                  42
                </div>
                <div className="text-[11.5px] font-semibold text-[var(--text-500)] mt-[2px]">
                  전체
                </div>
              </div>
              <div className="px-[18px] py-[12px] bg-white border border-[var(--border-2)] rounded-[var(--r-md)] text-center">
                <div className="text-[20px] font-extrabold text-[var(--warning)] tracking-[-0.01em]">
                  8
                </div>
                <div className="text-[11.5px] font-semibold text-[var(--text-500)] mt-[2px]">
                  미답변
                </div>
              </div>
              <div className="px-[18px] py-[12px] bg-white border border-[var(--border-2)] rounded-[var(--r-md)] text-center">
                <div className="text-[20px] font-extrabold text-[var(--success)] tracking-[-0.01em]">
                  34
                </div>
                <div className="text-[11.5px] font-semibold text-[var(--text-500)] mt-[2px]">
                  답변 완료
                </div>
              </div>
            </div>
          </div>

          {/* 필터 & 탭 */}
          <div className="flex gap-[12px] items-center mb-[20px]">
            <div className="flex-1 relative">
              <svg
                className="absolute left-[16px] top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[var(--text-400)]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              <input
                className="w-full h-[46px] pl-[44px] pr-[16px] bg-[var(--surface)] border border-[var(--border-2)] rounded-[var(--r-full)] text-[14px] text-[var(--text-900)] outline-none focus:border-[var(--primary-500)] focus:ring-[4px] focus:ring-[var(--primary-50)] transition-colors placeholder-[var(--text-400)]"
                placeholder="질문 내용 또는 키워드 검색"
              />
            </div>
            <div className="flex gap-[4px] p-[4px] bg-[var(--surface-2)] border border-[var(--border-1)] rounded-[var(--r-full)]">
              <button
                onClick={() => setActiveTab('pending')}
                className={`h-[34px] px-[16px] rounded-[var(--r-full)] text-[13px] font-bold flex items-center transition-all ${activeTab === 'pending' ? 'bg-white text-[var(--primary-700)] shadow-[var(--shadow-sm)]' : 'text-[var(--text-500)] hover:text-[var(--text-700)]'}`}
              >
                미답변{' '}
                <span
                  className={`ml-[6px] min-w-[18px] h-[18px] px-[6px] rounded-[var(--r-full)] flex items-center justify-center text-[10.5px] font-extrabold ${activeTab === 'pending' ? 'bg-[var(--primary-500)] text-white' : 'bg-[var(--primary-100)] text-[var(--primary-700)]'}`}
                >
                  8
                </span>
              </button>
              <button
                onClick={() => setActiveTab('answered')}
                className={`h-[34px] px-[16px] rounded-[var(--r-full)] text-[13px] font-bold flex items-center transition-all ${activeTab === 'answered' ? 'bg-white text-[var(--primary-700)] shadow-[var(--shadow-sm)]' : 'text-[var(--text-500)] hover:text-[var(--text-700)]'}`}
              >
                답변 완료{' '}
                <span
                  className={`ml-[6px] min-w-[18px] h-[18px] px-[6px] rounded-[var(--r-full)] flex items-center justify-center text-[10.5px] font-extrabold ${activeTab === 'answered' ? 'bg-[var(--primary-500)] text-white' : 'bg-[var(--primary-100)] text-[var(--primary-700)]'}`}
                >
                  34
                </span>
              </button>
              <button
                onClick={() => setActiveTab('reported')}
                className={`h-[34px] px-[16px] rounded-[var(--r-full)] text-[13px] font-bold flex items-center transition-all ${activeTab === 'reported' ? 'bg-white text-[var(--primary-700)] shadow-[var(--shadow-sm)]' : 'text-[var(--text-500)] hover:text-[var(--text-700)]'}`}
              >
                신고됨{' '}
                <span
                  className={`ml-[6px] min-w-[18px] h-[18px] px-[6px] rounded-[var(--r-full)] flex items-center justify-center text-[10.5px] font-extrabold ${activeTab === 'reported' ? 'bg-[var(--primary-500)] text-white' : 'bg-[var(--primary-100)] text-[var(--primary-700)]'}`}
                >
                  3
                </span>
              </button>
            </div>
          </div>

          {/* ==================== 탭 패널 1: 미답변 ==================== */}
          {activeTab === 'pending' && (
            <div className="animate-in fade-in duration-300">
              <div className="flex items-end justify-between mb-[14px]">
                <h2 className="m-0 text-[18px] font-extrabold text-[var(--text-900)] tracking-[-0.01em]">
                  📌 미답변 익명 질문 리스트
                </h2>
              </div>

              <div className="grid grid-cols-4 gap-[16px]">
                {PENDING_DATA.map((q) => (
                  <article
                    key={q.id}
                    onClick={() => setSelectedPendingId(q.id)}
                    className={`relative flex flex-col gap-[10px] min-h-[140px] bg-[var(--surface)] border rounded-[var(--r-lg)] p-[22px] transition-all duration-[180ms] cursor-pointer group ${selectedPendingId === q.id ? 'border-[var(--primary-500)] shadow-[0_0_0_3px_var(--primary-100)]' : 'border-[var(--border-2)] hover:border-[var(--primary-400)] hover:-translate-y-[2px] hover:shadow-[var(--shadow-md)]'}`}
                  >
                    {/* 카드 내 거절 버튼 */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openRejectModal(q.text);
                      }}
                      className="absolute top-[13px] right-[13px] inline-flex items-center gap-[4px] h-[26px] px-[10px] rounded-[var(--r-full)] bg-[var(--surface-2)] text-[var(--text-500)] text-[11px] font-bold transition-colors opacity-0 group-hover:opacity-100 hover:!bg-[#FFF1F3] hover:!text-[var(--danger)]"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="w-[12px] h-[12px]"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="m4.9 4.9 14.2 14.2" />
                      </svg>
                      거절
                    </button>

                    <span className="inline-flex items-center gap-[4px] self-start px-[10px] py-[3px] rounded-[var(--r-full)] bg-[var(--surface-2)] text-[var(--text-500)] text-[11px] font-bold">
                      <span className="text-[10px]">🔒</span> 익명 질문
                    </span>
                    <h4 className="m-0 text-[14.5px] font-extrabold text-[var(--text-900)] tracking-[-0.01em] leading-[1.45] line-clamp-3">
                      {q.text}
                    </h4>
                    <div className="mt-auto pt-[8px] text-[12px] text-[var(--text-400)] font-semibold">
                      {q.time}
                    </div>
                  </article>
                ))}
              </div>

              {/* 빠른 답변 에디터 */}
              <div className="bg-white border border-[var(--border-2)] rounded-[var(--r-lg)] p-[28px_32px] mt-[32px] shadow-[var(--shadow-sm)]">
                <h3 className="m-0 mb-[4px] text-[18px] font-extrabold text-[var(--text-900)] tracking-[-0.01em]">
                  ✍️ 빠른 답변 에디터
                </h3>
                <p className="m-0 mb-[20px] text-[13px] text-[var(--text-500)]">
                  왼쪽에서 카드를 선택하면 자동으로 미리보기가 채워집니다. 바로
                  답변을 등록하세요.
                </p>

                <div className="grid grid-cols-2 gap-[20px]">
                  <div className="flex flex-col gap-[6px]">
                    <label className="text-[13px] font-bold text-[var(--text-900)]">
                      선택된 질문
                    </label>
                    <div className="p-[14px_16px] bg-[var(--primary-50)] border border-[var(--primary-100)] rounded-[var(--r-md)] text-[13.5px] text-[var(--primary-700)] leading-[1.55] min-h-[50px]">
                      <small className="block mb-[4px] text-[11px] font-bold text-[var(--primary-600)] tracking-[0.08em]">
                        📌 미답변 질문
                      </small>
                      {selectedQuestion?.text}
                    </div>
                  </div>
                  <div className="flex flex-col gap-[6px]">
                    <label className="text-[13px] font-bold text-[var(--text-900)]">
                      공개 범위
                    </label>
                    <select className="w-full h-[46px] px-[16px] bg-white border border-[var(--border-2)] rounded-[var(--r-md)] text-[14px] text-[var(--text-900)] outline-none focus:border-[var(--primary-500)] focus:ring-[4px] focus:ring-[var(--primary-50)] transition-colors">
                      <option>전체 공개 — 피드에 노출</option>
                      <option>링크 보유자만 — 비공개 페이지</option>
                      <option>비공개 저장만</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-[6px] col-span-2">
                    <label className="text-[13px] font-bold text-[var(--text-900)]">
                      답변 내용{' '}
                      <span className="float-right text-[12px] font-semibold text-[var(--text-400)]">
                        0 / 2,000
                      </span>
                    </label>
                    <textarea
                      className="w-full min-h-[180px] p-[14px_16px] resize-y bg-white border border-[var(--border-2)] rounded-[var(--r-md)] text-[14px] leading-[1.6] text-[var(--text-900)] outline-none focus:border-[var(--primary-500)] focus:ring-[4px] focus:ring-[var(--primary-50)] transition-colors placeholder-[var(--text-400)]"
                      placeholder="익명 질문에 진심을 담아 답변해주세요. 구체적 경험을 적으면 답변 만족도가 높아져요."
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center mt-[18px] pt-[18px] border-t border-dashed border-[var(--border-1)]">
                  {/* 디자인 시스템 원칙 준수: danger 스타일을 Tailwind 클래스로 직접 조합 (Button 확장 방지) */}
                  <button
                    onClick={() =>
                      selectedQuestion && openRejectModal(selectedQuestion.text)
                    }
                    className="inline-flex items-center justify-center gap-[8px] h-[36px] px-[14px] text-[13px] rounded-[var(--r-sm)] font-bold bg-white text-[var(--danger)] border border-[#FFD2D8] hover:bg-[#FFF1F3] transition-colors"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="w-[14px] h-[14px]"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="m4.9 4.9 14.2 14.2" />
                    </svg>
                    답변 거절
                  </button>
                  <div className="flex gap-[10px]">
                    <Button variant="outline">초안 저장</Button>
                    <Button variant="primary">
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
                      답변 등록
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==================== 탭 패널 2: 답변 완료 ==================== */}
          {activeTab === 'answered' && (
            <div className="animate-in fade-in duration-300">
              <div className="flex items-end justify-between mb-[14px]">
                <h2 className="m-0 text-[18px] font-extrabold text-[var(--text-900)] tracking-[-0.01em]">
                  ✅ 답변 완료한 질문
                </h2>
              </div>
              <div className="flex flex-col gap-[14px]">
                {ANSWERED_DATA.map((item) => (
                  <article
                    key={item.id}
                    className="grid grid-cols-[1fr_auto] gap-[20px] items-start bg-[var(--surface)] border border-[var(--border-2)] rounded-[var(--r-lg)] p-[20px_24px] cursor-pointer transition-all hover:border-[var(--primary-400)] hover:-translate-y-[1px] hover:shadow-[var(--shadow-md)]"
                  >
                    <div>
                      <span className="inline-flex items-center gap-[4px] px-[10px] py-[3px] rounded-[var(--r-full)] bg-[var(--surface-2)] text-[var(--text-500)] text-[11px] font-bold mb-[8px]">
                        <span className="text-[10px]">🔒</span> 익명 질문
                      </span>
                      <h4 className="m-0 mb-[8px] text-[15px] font-extrabold text-[var(--text-900)] tracking-[-0.01em] leading-[1.4]">
                        {item.text}
                      </h4>
                      <p className="m-0 text-[13.5px] text-[var(--text-900)] leading-[1.55] line-clamp-2">
                        {item.ans}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-[6px] min-w-[96px]">
                      <span
                        className={`inline-flex items-center gap-[4px] h-[24px] px-[10px] rounded-[var(--r-full)] text-[11.5px] font-bold ${item.statusText === '공개' ? 'bg-[#22C29A]/10 text-[#0E8C68]' : 'bg-[var(--surface-2)] text-[var(--text-500)]'}`}
                      >
                        ● {item.statusText}
                      </span>
                      <span className="text-[11.5px] font-semibold text-[var(--text-400)]">
                        {item.date}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* ==================== 탭 패널 3: 신고됨 ==================== */}
          {activeTab === 'reported' && (
            <div className="animate-in fade-in duration-300">
              <div className="mb-[18px]">
                <h2 className="m-0 mb-[6px] text-[18px] font-extrabold text-[var(--text-900)] tracking-[-0.01em]">
                  🚨 신고된 질문
                </h2>
                <p className="m-0 text-[13px] text-[var(--text-500)]">
                  내가 신고했거나 자동 필터에 걸린 질문입니다. 운영자 검토
                  결과를 기다리거나 직접 답변 거절로 처리할 수 있어요.
                </p>
              </div>
              <div className="flex flex-col gap-[14px]">
                {REPORTED_DATA.map((item) => (
                  <article
                    key={item.id}
                    className={`grid grid-cols-[1fr_auto] gap-[24px] items-start p-[22px_24px] border rounded-[var(--r-lg)] ${item.resolved ? 'bg-[var(--surface-2)] border-[var(--border-2)]' : 'bg-white border-[#FFD9DE]'}`}
                  >
                    <div>
                      <div className="flex items-center gap-[8px] mb-[10px]">
                        <span
                          className={`inline-flex items-center px-[10px] py-[3px] rounded-[var(--r-full)] text-[11.5px] font-bold ${item.type.includes('스팸') ? 'bg-[rgba(255,181,71,0.18)] text-[#B66E00]' : 'bg-[rgba(255,90,110,0.12)] text-[#C13146]'}`}
                        >
                          {item.type}
                        </span>
                        <span className="text-[11.5px] font-semibold text-[var(--text-500)]">
                          {item.count}
                        </span>
                      </div>
                      <h4 className="m-0 mb-[6px] text-[15px] font-extrabold text-[var(--text-900)] tracking-[-0.01em] leading-[1.45]">
                        {item.title}
                      </h4>
                      <p className="m-0 p-[12px_14px] bg-[var(--surface-2)] border-l-[3px] border-[var(--border-3)] rounded-[var(--r-md)] text-[13px] text-[var(--text-500)] leading-[1.55]">
                        {item.quote}
                      </p>
                      <div className="mt-[10px] text-[12px] text-[var(--text-400)] font-semibold">
                        {item.time}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-[10px] min-w-[150px]">
                      <span
                        className={`inline-flex items-center gap-[5px] px-[12px] py-[5px] rounded-[var(--r-full)] text-[11.5px] font-bold ${item.resolved ? 'bg-[rgba(34,194,154,0.12)] text-[#0E8C68]' : 'bg-[rgba(255,181,71,0.18)] text-[#B66E00]'}`}
                      >
                        <div
                          className={`w-[6px] h-[6px] rounded-full ${item.resolved ? 'bg-[var(--success)]' : 'bg-[var(--warning)]'}`}
                        />
                        {item.status}
                      </span>
                      <div className="flex flex-col gap-[6px] w-full mt-[4px]">
                        {item.resolved ? (
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                          >
                            처리 로그
                          </Button>
                        ) : (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full"
                            >
                              원문 보기
                            </Button>
                            <button
                              onClick={() => openRejectModal(item.title)}
                              className="inline-flex items-center justify-center h-[36px] rounded-[var(--r-sm)] text-[13px] font-bold bg-white text-[var(--danger)] border border-[#FFD2D8] hover:bg-[#FFF1F3] transition-colors w-full"
                            >
                              답변 거절
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>

      {/* ============================================================
          3. 답변 거절 & 신고 모달
          ============================================================ */}
      <div
        className={`fixed inset-0 z-[100] bg-[#0F0F1A]/45 backdrop-blur-[3px] flex items-center justify-center p-[24px] transition-opacity duration-200 ${isRejectModalOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={closeRejectModal}
      >
        <div
          className={`bg-[var(--surface)] rounded-[var(--r-xl)] w-full max-w-[480px] shadow-[0_24px_60px_rgba(15,15,26,0.28)] overflow-hidden transition-transform duration-200 ${isRejectModalOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-[12px]'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-[24px_26px_0] relative">
            <button
              onClick={closeRejectModal}
              className="absolute top-[18px] right-[18px] w-[32px] h-[32px] rounded-[8px] flex items-center justify-center text-[var(--text-400)] hover:bg-[var(--surface-2)] hover:text-[var(--text-900)] transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-[18px] h-[18px]"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
            <div className="w-[44px] h-[44px] rounded-[14px] bg-[rgba(255,90,110,0.12)] flex items-center justify-center mb-[14px] text-[var(--danger)]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-[22px] h-[22px]"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="m4.9 4.9 14.2 14.2" />
              </svg>
            </div>
            <h3 className="m-0 mb-[6px] text-[18px] font-extrabold text-[var(--text-900)] tracking-[-0.01em]">
              답변 거절 &amp; 신고
            </h3>
            <p className="m-0 text-[13px] text-[var(--text-500)] leading-[1.55]">
              거절한 질문은 '거절됨'으로 기록됩니다. 욕설·스팸 등 악성 사유를
              선택하면 운영자에게 자동으로 신고가 접수돼요.
            </p>
          </div>

          <div className="p-[20px_26px]">
            <div className="p-[12px_14px] bg-[var(--surface-2)] border-l-[3px] border-[var(--border-3)] rounded-[var(--r-md)] text-[13px] text-[var(--text-900)] leading-[1.5] mb-[18px]">
              {rejectTargetText}
            </div>

            <div className="text-[13px] font-bold text-[var(--text-900)] mb-[8px]">
              거절 사유를 선택하세요
            </div>
            <div className="flex flex-col gap-[8px] mb-[18px]">
              {REJECT_REASONS.map((r) => (
                <div
                  key={r.id}
                  onClick={() => setRejectReasonId(r.id)}
                  className={`flex items-center gap-[10px] p-[12px_14px] border rounded-[var(--r-md)] cursor-pointer text-[13.5px] font-semibold transition-colors ${rejectReasonId === r.id ? 'border-[var(--primary-500)] bg-[var(--primary-50)] text-[var(--primary-700)]' : 'border-[var(--border-2)] text-[var(--text-900)] hover:border-[var(--primary-300)] hover:bg-[var(--primary-50)]'}`}
                >
                  <div
                    className={`w-[18px] h-[18px] rounded-full border-[2px] flex items-center justify-center shrink-0 transition-colors ${rejectReasonId === r.id ? 'border-[var(--primary-500)]' : 'border-[var(--border-3)]'}`}
                  >
                    {rejectReasonId === r.id && (
                      <div className="w-[10px] h-[10px] rounded-full bg-[var(--primary-500)]" />
                    )}
                  </div>
                  {r.icon} {r.label}
                </div>
              ))}
            </div>

            <div className="text-[13px] font-bold text-[var(--text-900)] mb-[8px]">
              상세 사유{' '}
              <span className="text-[var(--text-400)] font-semibold">
                (선택)
              </span>
            </div>
            <textarea
              className="w-full min-h-[84px] p-[12px_14px] resize-y bg-white border border-[var(--border-2)] rounded-[var(--r-md)] text-[13.5px] leading-[1.5] text-[var(--text-900)] outline-none focus:border-[var(--primary-500)] focus:ring-[4px] focus:ring-[var(--primary-50)] transition-colors placeholder-[var(--text-400)]"
              placeholder="운영자 검토에 도움이 되는 내용을 적어주세요. '단순 거절'은 비워두셔도 됩니다."
            />
          </div>

          <div className="p-[16px_26px_22px] flex justify-end gap-[10px] border-t border-[var(--border-1)]">
            <Button variant="outline" onClick={closeRejectModal}>
              취소
            </Button>
            {/* danger 버튼의 역할을 하도록 인라인 스타일 사용 */}
            <button
              className="inline-flex items-center justify-center gap-[8px] h-[44px] px-[22px] rounded-[var(--r-md)] text-[14px] font-bold bg-white text-[var(--danger)] border border-[#FFD2D8] hover:bg-[#FFF1F3] transition-colors"
              onClick={() => {
                alert('거절 처리되었습니다.');
                closeRejectModal();
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-[16px] h-[16px]"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="m4.9 4.9 14.2 14.2" />
              </svg>
              {rejectReasonId === 'decline' ? '거절하기' : '거절하고 신고하기'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
