import { useState, type ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';

// =====================================================================
// [정적 데이터] 서버 알림 API가 아직 없어 목 데이터로 화면만 구성한다.
// =====================================================================
type NotificationType = 'question' | 'answer' | 'system';

interface NotificationItem {
  id: number;
  type: NotificationType;
  title: string;
  body: string;
  time: string;
  read: boolean;
  link: string; // 카드 클릭 시 이동할 경로
}

const NOTIFICATIONS: NotificationItem[] = [
  {
    id: 1,
    type: 'question',
    title: '새로운 익명 질문이 도착했어요',
    body: '퇴근하고 운동 꾸준히 하는 비결이 뭔가요?',
    time: '방금 전',
    read: false,
    link: '/inbox',
  },
  {
    id: 2,
    type: 'question',
    title: '새로운 익명 질문이 도착했어요',
    body: '처음 시작하는 방법이 막막한데 어떻게 시작했나요?',
    time: '32분 전',
    read: false,
    link: '/inbox',
  },
  {
    id: 3,
    type: 'answer',
    title: '내 질문에 답변이 등록됐어요',
    body: '@traveler-J 님이 "가성비 항공권 어떻게 찾으세요?"에 답변했어요.',
    time: '1시간 전',
    read: false,
    link: '/answers',
  },
  {
    id: 4,
    type: 'system',
    title: '신고한 질문이 처리됐어요',
    body: '개인정보 노출로 신고한 질문이 운영자 검토 후 숨김 처리되었습니다.',
    time: '3시간 전',
    read: false,
    link: '/inbox',
  },
  {
    id: 5,
    type: 'answer',
    title: '내 답변이 100회 조회됐어요',
    body: '"번아웃 왔을 때 어떻게 회복했는지 궁금해요" 답변이 인기를 얻고 있어요.',
    time: '5시간 전',
    read: true,
    link: '/answers',
  },
  {
    id: 6,
    type: 'question',
    title: '미답변 질문이 쌓이고 있어요',
    body: '8개의 질문이 답변을 기다리고 있어요. 오래된 질문부터 확인해보세요.',
    time: '8시간 전',
    read: true,
    link: '/inbox',
  },
  {
    id: 7,
    type: 'system',
    title: '공유 링크가 재발급됐어요',
    body: '이전 링크는 더 이상 동작하지 않습니다. 새 링크를 프로필에서 확인하세요.',
    time: '1일 전',
    read: true,
    link: '/mypage',
  },
  {
    id: 8,
    type: 'answer',
    title: '내 질문에 답변이 등록됐어요',
    body: '@travel-writer-min 님이 "혼행 첫 도시 추천해주세요"에 답변했어요.',
    time: '1일 전',
    read: true,
    link: '/answers',
  },
  {
    id: 9,
    type: 'question',
    title: '새로운 익명 질문이 도착했어요',
    body: '최근에 본 영화 중 인상 깊은 작품이 있나요?',
    time: '2일 전',
    read: true,
    link: '/inbox',
  },
  {
    id: 10,
    type: 'system',
    title: '프로필이 업데이트됐어요',
    body: '닉네임과 소개글 변경이 정상적으로 반영되었습니다.',
    time: '3일 전',
    read: true,
    link: '/mypage',
  },
];

// 탭 정의 — 'all'은 전체를 의미하므로 필터에서 제외한다.
const TABS = [
  { id: 'all', label: '전체' },
  { id: 'question', label: '질문' },
  { id: 'answer', label: '답변' },
  { id: 'system', label: '시스템' },
] as const;

type TabId = (typeof TABS)[number]['id'];

// 타입별 아이콘 배지 스타일 — 디자인 토큰만 사용한다.
const TYPE_STYLE: Record<
  NotificationType,
  { bg: string; text: string; icon: ReactNode }
> = {
  question: {
    bg: 'bg-[var(--primary-50)]',
    text: 'text-[var(--primary-600)]',
    icon: (
      <>
        <path d="M22 12h-6l-2 3h-4l-2-3H2" />
        <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
      </>
    ),
  },
  answer: {
    bg: 'bg-[rgba(20,195,142,0.12)]',
    text: 'text-[#0E8C68]',
    icon: (
      <>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </>
    ),
  },
  system: {
    bg: 'bg-[rgba(255,181,71,0.18)]',
    text: 'text-[#B66E00]',
    icon: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v5M12 16h.01" />
      </>
    ),
  },
};

const TYPE_LABEL: Record<NotificationType, string> = {
  question: '질문',
  answer: '답변',
  system: '시스템',
};

export default function NotificationsPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState<NotificationItem[]>(NOTIFICATIONS);
  const [activeTab, setActiveTab] = useState<TabId>('all');

  const unreadCount = items.filter((item) => !item.read).length;

  // 탭별 개수 배지에 쓰인다.
  const countOf = (tab: TabId) =>
    tab === 'all'
      ? items.length
      : items.filter((item) => item.type === tab).length;

  const visibleItems =
    activeTab === 'all'
      ? items
      : items.filter((item) => item.type === activeTab);

  const markAllAsRead = () =>
    setItems((prev) => prev.map((item) => ({ ...item, read: true })));

  // 카드를 누르면 읽음 처리 후 관련 페이지로 이동한다.
  const openNotification = (item: NotificationItem) => {
    setItems((prev) =>
      prev.map((it) => (it.id === item.id ? { ...it, read: true } : it)),
    );
    navigate(item.link);
  };

  return (
    <main className="max-w-[920px] mx-auto p-[36px_32px_120px]">
      {/* ============================================================
          1. Breadcrumb
          ============================================================ */}
      <div className="flex items-center gap-[10px] text-[13px] font-semibold text-[var(--text-500)] mb-[20px]">
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
        <span className="font-bold text-[var(--text-900)]">알림</span>
      </div>

      {/* ============================================================
          2. 헤더 박스
          ============================================================ */}
      <div className="bg-gradient-to-br from-[#F4F0FE] to-[#FFE4F3] border border-[var(--border-1)] rounded-[var(--r-lg)] p-[28px_32px] mb-[24px] flex items-center gap-[24px]">
        <div className="w-[64px] h-[64px] rounded-[18px] bg-[var(--primary-500)] flex items-center justify-center shadow-[var(--shadow-brand)] shrink-0 text-white">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="w-[28px] h-[28px]"
          >
            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </div>
        <div>
          <h1 className="m-0 mb-[4px] text-[22px] font-extrabold text-[var(--text-900)] tracking-[-0.01em]">
            알림
          </h1>
          <p className="m-0 text-[14px] text-[var(--text-500)]">
            {unreadCount > 0 ? (
              <>
                읽지 않은 알림이{' '}
                <strong className="text-[var(--primary-700)]">
                  {unreadCount}개
                </strong>{' '}
                있어요. 카드를 누르면 해당 페이지로 이동합니다.
              </>
            ) : (
              '새로운 알림이 없어요. 모든 알림을 확인했습니다.'
            )}
          </p>
        </div>
        <div className="ml-auto">
          {/* 안 읽은 알림이 없으면 눌러도 바뀌는 게 없으므로 숨긴다. */}
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-[14px] h-[14px]"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
              모두 읽음 처리
            </Button>
          )}
        </div>
      </div>

      {/* ============================================================
          3. 탭
          ============================================================ */}
      <div className="flex justify-end mb-[18px]">
        <div className="flex gap-[4px] p-[4px] bg-[var(--surface-2)] border border-[var(--border-1)] rounded-[var(--r-full)]">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`h-[34px] px-[16px] rounded-[var(--r-full)] text-[13px] font-bold flex items-center transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-[var(--primary-700)] shadow-[var(--shadow-sm)]'
                  : 'text-[var(--text-500)] hover:text-[var(--text-700)]'
              }`}
            >
              {tab.label}
              <span
                className={`ml-[6px] min-w-[18px] h-[18px] px-[6px] rounded-[var(--r-full)] flex items-center justify-center text-[10.5px] font-extrabold ${
                  activeTab === tab.id
                    ? 'bg-[var(--primary-500)] text-white'
                    : 'bg-[var(--primary-100)] text-[var(--primary-700)]'
                }`}
              >
                {countOf(tab.id)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ============================================================
          4. 알림 리스트 / 빈 상태
          ============================================================ */}
      {visibleItems.length > 0 ? (
        <section className="flex flex-col gap-[10px]">
          {visibleItems.map((item) => {
            const style = TYPE_STYLE[item.type];
            return (
              <article
                key={item.id}
                onClick={() => openNotification(item)}
                className={`relative flex items-start gap-[16px] p-[18px_22px] border rounded-[var(--r-lg)] cursor-pointer overflow-hidden transition-all duration-[180ms] hover:border-[var(--primary-400)] hover:-translate-y-[1px] hover:shadow-[var(--shadow-md)] ${
                  item.read
                    ? 'bg-[var(--surface)] border-[var(--border-2)]'
                    : 'bg-[var(--primary-50)] border-[var(--primary-100)]'
                }`}
              >
                {/* 안 읽은 알림 좌측 보라 바 */}
                {!item.read && (
                  <span className="absolute left-0 inset-y-0 w-[4px] bg-[var(--primary-500)]" />
                )}

                <div
                  className={`w-[40px] h-[40px] rounded-[13px] shrink-0 flex items-center justify-center ${style.bg} ${style.text}`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="w-[19px] h-[19px]"
                  >
                    {style.icon}
                  </svg>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-[8px] mb-[5px]">
                    <span
                      className={`inline-flex items-center px-[9px] py-[2px] rounded-[var(--r-full)] text-[11px] font-bold ${style.bg} ${style.text}`}
                    >
                      {TYPE_LABEL[item.type]}
                    </span>
                    <h3
                      className={`m-0 text-[14.5px] tracking-[-0.01em] truncate ${
                        item.read
                          ? 'font-bold text-[var(--text-700)]'
                          : 'font-extrabold text-[var(--text-900)]'
                      }`}
                    >
                      {item.title}
                    </h3>
                  </div>
                  <p className="m-0 text-[13.5px] text-[var(--text-500)] leading-[1.55] line-clamp-2">
                    {item.body}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-[8px] shrink-0">
                  <span className="text-[12px] font-semibold text-[var(--text-400)] whitespace-nowrap">
                    {item.time}
                  </span>
                  {!item.read && (
                    <span className="w-[8px] h-[8px] rounded-full bg-[var(--primary-500)]" />
                  )}
                </div>
              </article>
            );
          })}
        </section>
      ) : (
        <div className="bg-white border border-dashed border-[var(--border-2)] rounded-[var(--r-lg)] p-[60px_32px] text-center">
          <div className="w-[72px] h-[72px] mx-auto mb-[16px] rounded-[24px] bg-gradient-to-br from-[#F4F0FE] to-[#FFE4F3] flex items-center justify-center text-[32px]">
            🔔
          </div>
          <h3 className="m-0 mb-[6px] text-[18px] font-extrabold text-[var(--text-900)] tracking-[-0.01em]">
            아직 알림이 없어요
          </h3>
          <p className="m-0 mb-[18px] text-[14px] text-[var(--text-500)]">
            새로운 질문이나 답변이 도착하면 여기에서 알려드릴게요.
          </p>
          <Button variant="outline" size="sm" to="/inbox">
            내 질문함 보러가기
          </Button>
        </div>
      )}
    </main>
  );
}
