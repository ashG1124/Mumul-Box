import { useState } from 'react';
import { Avatar } from '../components/Avatar';
import { Button } from '../components/Button';

// =====================================================================
// MyPage 컴포넌트 밖으로 분리된 공통 토글 컴포넌트
// =====================================================================
const ToggleSwitch = ({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) => (
  <button
    onClick={onChange}
    className={`relative w-[48px] h-[28px] shrink-0 rounded-full transition-colors duration-200 ease-in-out cursor-pointer ${
      checked
        ? 'bg-gradient-to-r from-[var(--primary-400)] to-[var(--primary-600)]'
        : 'bg-[var(--border-2)]'
    }`}
  >
    <span
      className={`absolute left-[3px] top-[3px] w-[22px] h-[22px] bg-white rounded-full shadow-[0_2px_6px_rgba(0,0,0,0.18)] transition-transform duration-200 ease-in-out ${
        checked ? 'translate-x-[20px]' : 'translate-x-0'
      }`}
    />
  </button>
);

export default function MyPage() {
  const [activeNav, setActiveNav] = useState('profile');

  // 상태 관리
  const [nickname, setNickname] = useState('별빛익명');
  const [bio, setBio] = useState('오늘도 진심 어린 질문, 환영해요 🙌');
  const [displayStatus, setDisplayStatus] = useState('공개 — 검색 가능');

  const [notifyNew, setNotifyNew] = useState(true);
  const [notifyAns, setNotifyAns] = useState(true);
  const [notifyNotice, setNotifyNotice] = useState(false);

  const [language, setLanguage] = useState('한국어');
  const [receiveAnon, setReceiveAnon] = useState(true);

  return (
    <main className="max-w-[1280px] mx-auto p-[48px_32px_120px] grid grid-cols-[240px_1fr] gap-[48px] items-start">
      {/* ============================================================
          1. 좌측 사이드바 내비게이션
          ============================================================ */}
      <aside className="sticky top-[104px]">
        <div className="flex items-center gap-[10px] px-[12px] pb-[16px] mb-[8px] border-b border-[var(--border-1)]">
          <div className="w-[36px] h-[36px] rounded-full bg-gradient-to-br from-[#FFB6E1] to-[var(--primary-300)]" />
          <h2 className="m-0 text-[18px] font-extrabold text-[var(--text-900)] tracking-[-0.01em]">
            마이페이지
          </h2>
        </div>
        <nav className="flex flex-col gap-[2px] pt-[8px]">
          {[
            {
              id: 'profile',
              icon: (
                <>
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </>
              ),
              label: '프로필',
            },
            {
              id: 'share',
              icon: (
                <>
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </>
              ),
              label: '내 질문함 링크',
            },
            {
              id: 'notify',
              icon: (
                <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
              ),
              label: '알림',
            },
            {
              id: 'privacy',
              icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
              label: '개인정보',
            },
            {
              id: 'settings',
              icon: (
                <>
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v0a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </>
              ),
              label: '설정',
            },
          ].map((nav) => (
            <a
              key={nav.id}
              href={`#${nav.id}`}
              onClick={() => setActiveNav(nav.id)}
              className={`flex items-center gap-[10px] h-[44px] px-[14px] rounded-[var(--r-md)] text-[14px] font-semibold transition-colors ${
                activeNav === nav.id
                  ? 'bg-[var(--primary-50)] text-[var(--primary-700)]'
                  : 'text-[var(--text-500)] hover:bg-[var(--primary-50)] hover:text-[var(--primary-700)]'
              }`}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-[18px] h-[18px]"
              >
                {nav.icon}
              </svg>
              {nav.label}
              {activeNav === nav.id && (
                <div className="ml-auto w-[6px] h-[6px] rounded-full bg-[var(--primary-500)]" />
              )}
            </a>
          ))}
        </nav>
      </aside>

      {/* ============================================================
          2. 메인 콘텐츠
          ============================================================ */}
      <section className="flex flex-col gap-[24px]">
        {/* 상단 배너 */}
        <div className="bg-gradient-to-br from-[#F4F0FE] to-[#FFE4F3] border border-[var(--border-1)] rounded-[var(--r-lg)] p-[32px_36px] flex items-center gap-[24px] mb-[12px]">
          <div className="w-[64px] h-[64px] rounded-[18px] bg-gradient-to-br from-[var(--primary-400)] to-[var(--primary-600)] flex items-center justify-center shadow-[var(--shadow-brand)] shrink-0 text-white">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-[28px] h-[28px]"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <div>
            <h1 className="m-0 mb-[4px] text-[22px] font-extrabold text-[var(--text-900)] tracking-[-0.01em]">
              익명 질문 서비스 개인 설정을 관리하세요
            </h1>
            <p className="m-0 text-[14px] text-[var(--text-500)]">
              링크 공유, 프로필 정보, 알림을 한 곳에서 업데이트할 수 있어요.
            </p>
          </div>
        </div>

        {/* --- [섹션 1] 링크 공유 --- */}
        <div
          id="share"
          className="bg-white border border-[var(--border-2)] rounded-[var(--r-lg)] p-[28px_32px] shadow-[var(--shadow-sm)] scroll-mt-[120px]"
        >
          <div className="mb-[20px]">
            <h3 className="m-0 mb-[4px] text-[18px] font-extrabold text-[var(--text-900)] tracking-[-0.01em]">
              🔗 내 질문함 링크
            </h3>
            <p className="m-0 text-[13px] text-[var(--text-500)]">
              내 질문함으로 이동할 수 있는 주소를 복사하여 공유하세요.
            </p>
          </div>
          <div className="grid grid-cols-[1fr_auto] gap-[12px] items-stretch">
            <div
              className="flex items-center gap-[10px] p-[14px_16px] bg-[var(--primary-50)] border border-[var(--primary-100)] rounded-[var(--r-md)] text-[var(--primary-700)] text-[13.5px] font-semibold whitespace-nowrap overflow-hidden text-ellipsis"
              style={{
                fontFamily:
                  "'SF Mono', ui-monospace, Menlo, Consolas, monospace",
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-[16px] h-[16px] shrink-0"
              >
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
              https://mumul.box/u/starlight-anonymous-2026
            </div>
            <div className="flex gap-[8px]">
              <Button variant="outline">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-[16px] h-[16px]"
                >
                  <path d="M3 12a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 8" />
                  <path d="M21 3v5h-5" />
                  <path d="M21 12a9 9 0 0 1-9 9 9 9 0 0 1-6-2.3L3 16" />
                  <path d="M3 21v-5h5" />
                </svg>
                링크 재생성
              </Button>
              <Button variant="primary">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-[16px] h-[16px]"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                복사하기
              </Button>
            </div>
          </div>
        </div>

        {/* --- [섹션 2] 프로필 수정 --- */}
        <div
          id="profile"
          className="bg-white border border-[var(--border-2)] rounded-[var(--r-lg)] p-[28px_32px] shadow-[var(--shadow-sm)] scroll-mt-[120px]"
        >
          <div className="mb-[20px]">
            <h3 className="m-0 mb-[4px] text-[18px] font-extrabold text-[var(--text-900)] tracking-[-0.01em]">
              👤 프로필 수정
            </h3>
            <p className="m-0 text-[13px] text-[var(--text-500)]">
              표시되는 닉네임과 소개글, 아바타를 원하는 대로 변경하세요.
            </p>
          </div>
          <div className="grid grid-cols-[120px_1fr] gap-[28px] items-start">
            <div className="relative">
              <Avatar
                hasImg={true}
                size={120}
                className="shadow-[var(--shadow-md)]"
              />
              <button className="absolute right-[-2px] bottom-[-2px] w-[36px] h-[36px] rounded-full bg-white border-[2px] border-[var(--primary-100)] flex items-center justify-center text-[var(--primary-600)] hover:bg-[var(--primary-50)] transition-colors cursor-pointer">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  className="w-[16px] h-[16px]"
                >
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                </svg>
              </button>
            </div>
            <div>
              <div className="grid grid-cols-2 gap-x-[20px] gap-y-[18px]">
                <div className="flex flex-col gap-[6px]">
                  <label className="text-[13px] font-bold text-[var(--text-900)]">
                    닉네임{' '}
                    <span className="float-right font-semibold text-[var(--text-500)] text-[12px]">
                      {nickname.length} / 12
                    </span>
                  </label>
                  <input
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    className="w-full h-[46px] px-[16px] bg-white border border-[var(--border-2)] rounded-[var(--r-md)] text-[14px] text-[var(--text-900)] outline-none focus:border-[var(--primary-500)] focus:ring-[4px] focus:ring-[var(--primary-50)] transition-all"
                  />
                  <div className="text-[12px] text-[var(--text-500)] mt-[2px]">
                    공개용 닉네임입니다. 다른 유저 검색에 노출됩니다.
                  </div>
                </div>
                <div className="flex flex-col gap-[6px]">
                  <label className="text-[13px] font-bold text-[var(--text-900)]">
                    표시 상태
                  </label>
                  <select
                    value={displayStatus}
                    onChange={(e) => setDisplayStatus(e.target.value)}
                    className="w-full h-[46px] px-[16px] bg-white border border-[var(--border-2)] rounded-[var(--r-md)] text-[14px] text-[var(--text-900)] outline-none focus:border-[var(--primary-500)] focus:ring-[4px] focus:ring-[var(--primary-50)] transition-all"
                  >
                    <option>공개 — 검색 가능</option>
                    <option>비공개 — 링크 보유자만 접근</option>
                  </select>
                  <div className="text-[12px] text-[var(--text-500)] mt-[2px]">
                    기본값: 공개
                  </div>
                </div>
                <div className="flex flex-col gap-[6px] col-span-2">
                  <label className="text-[13px] font-bold text-[var(--text-900)]">
                    소개글{' '}
                    <span className="float-right font-semibold text-[var(--text-500)] text-[12px]">
                      {bio.length} / 100
                    </span>
                  </label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full min-h-[96px] p-[14px_16px] leading-[1.55] resize-y bg-white border border-[var(--border-2)] rounded-[var(--r-md)] text-[14px] text-[var(--text-900)] outline-none focus:border-[var(--primary-500)] focus:ring-[4px] focus:ring-[var(--primary-50)] transition-all"
                  />
                  <div className="text-[12px] text-[var(--text-500)] mt-[2px]">
                    짧고 친근하게 작성하면 좋아요.
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-[10px] mt-[24px] pt-[20px] border-t border-dashed border-[var(--border-1)]">
                <Button variant="outline">변경 취소</Button>
                <Button variant="primary">프로필 저장</Button>
              </div>
            </div>
          </div>
        </div>

        {/* --- [섹션 3] 알림 설정 --- */}
        <div
          id="notify"
          className="bg-white border border-[var(--border-2)] rounded-[var(--r-lg)] p-[28px_32px] shadow-[var(--shadow-sm)] scroll-mt-[120px]"
        >
          <div className="mb-[20px]">
            <h3 className="m-0 mb-[4px] text-[18px] font-extrabold text-[var(--text-900)] tracking-[-0.01em]">
              🔔 알림 설정
            </h3>
            <p className="m-0 text-[13px] text-[var(--text-500)]">
              새로운 질문과 서비스 공지 알림을 항목별로 켜고 끌 수 있어요.
            </p>
          </div>
          <div className="flex flex-col gap-[10px]">
            {[
              {
                id: 'notifyNew',
                emoji: '📨',
                title: '새로운 질문 도착 알림',
                desc: '익명 질문이 등록되면 즉시 알려드려요.',
                state: notifyNew,
                set: setNotifyNew,
              },
              {
                id: 'notifyAns',
                emoji: '✉️',
                title: '답변 등록 완료 알림',
                desc: '내가 작성한 답변이 정상 등록·게시되면 알려드려요.',
                state: notifyAns,
                set: setNotifyAns,
              },
              {
                id: 'notifyNotice',
                emoji: '📢',
                title: '서비스 공지/업데이트',
                desc: '중요한 업데이트와 공지 사항을 받아봅니다.',
                state: notifyNotice,
                set: setNotifyNotice,
              },
            ].map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-[16px] p-[16px_20px] bg-[var(--surface-2)] border border-[var(--border-1)] rounded-[var(--r-md)]"
              >
                <div className="w-[40px] h-[40px] rounded-[12px] bg-white border border-[var(--border-1)] flex items-center justify-center text-[20px] shrink-0">
                  {item.emoji}
                </div>
                <div className="flex-1">
                  <h5 className="m-0 text-[14px] font-extrabold text-[var(--text-900)]">
                    {item.title}
                  </h5>
                  <p className="m-0 mt-[2px] text-[12.5px] text-[var(--text-500)]">
                    {item.desc}
                  </p>
                </div>
                <ToggleSwitch
                  checked={item.state}
                  onChange={() => item.set(!item.state)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* --- [섹션 4] 개인정보 --- */}
        <div
          id="privacy"
          className="bg-white border border-[var(--border-2)] rounded-[var(--r-lg)] p-[28px_32px] shadow-[var(--shadow-sm)] scroll-mt-[120px]"
        >
          <div className="mb-[20px]">
            <h3 className="m-0 mb-[4px] text-[18px] font-extrabold text-[var(--text-900)] tracking-[-0.01em]">
              🛡️ 개인정보
            </h3>
            <p className="m-0 text-[13px] text-[var(--text-500)]">
              로그인 정보와 보안 설정을 관리합니다. 비밀번호는 8자 이상을
              권장해요.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-[24px] gap-y-[14px]">
            <div className="flex flex-col gap-[4px] py-[14px] border-b border-[var(--border-1)]">
              <span className="text-[12.5px] text-[var(--text-500)] font-semibold">
                이메일
              </span>
              <span className="text-[14.5px] text-[var(--text-900)] font-semibold">
                an83223509@tukorea.ac.kr
              </span>
            </div>
            <div className="flex flex-col gap-[4px] py-[14px] border-b border-[var(--border-1)]">
              <span className="text-[12.5px] text-[var(--text-500)] font-semibold">
                가입일
              </span>
              <span className="text-[14.5px] text-[var(--text-900)] font-semibold">
                2026.04.12
              </span>
            </div>
            <div className="flex flex-col gap-[4px] py-[14px] border-b border-[var(--border-1)]">
              <span className="text-[12.5px] text-[var(--text-500)] font-semibold">
                비밀번호
              </span>
              <span className="text-[14.5px] text-[var(--text-900)] font-semibold flex items-center">
                ●●●●●●●●{' '}
                <Button variant="ghost" size="sm" className="ml-[10px]">
                  변경
                </Button>
              </span>
            </div>
            <div className="flex flex-col gap-[4px] py-[14px] border-b border-[var(--border-1)]">
              <span className="text-[12.5px] text-[var(--text-500)] font-semibold">
                2단계 인증
              </span>
              <span className="text-[14.5px] text-[var(--text-900)] font-semibold flex items-center">
                미설정{' '}
                <Button variant="ghost" size="sm" className="ml-[10px]">
                  설정하기
                </Button>
              </span>
            </div>
          </div>
          <div className="bg-[#FFF7F8] border border-[#FFD2D8] rounded-[var(--r-md)] p-[20px_24px] flex items-center justify-between gap-[20px] mt-[24px]">
            <div>
              <h5 className="m-0 text-[14px] font-extrabold text-[#C12338]">
                계정 삭제
              </h5>
              <p className="m-0 mt-[2px] text-[12.5px] text-[#A02538]">
                모든 질문·답변·통계가 영구 삭제되며 복구할 수 없습니다.
              </p>
            </div>
            <button className="h-[44px] px-[20px] rounded-[var(--r-md)] text-[14px] font-bold bg-white text-[var(--danger)] border border-[#FFD2D8] hover:bg-[#FFF1F3] transition-colors shrink-0">
              계정 삭제 요청
            </button>
          </div>
        </div>

        {/* --- [섹션 5] 설정 --- */}
        <div
          id="settings"
          className="bg-white border border-[var(--border-2)] rounded-[var(--r-lg)] p-[28px_32px] shadow-[var(--shadow-sm)] scroll-mt-[120px]"
        >
          <div className="mb-[20px]">
            <h3 className="m-0 mb-[4px] text-[18px] font-extrabold text-[var(--text-900)] tracking-[-0.01em]">
              ⚙️ 설정
            </h3>
            <p className="m-0 text-[13px] text-[var(--text-500)]">
              언어와 공개 여부 등 환경을 조정할 수 있어요.
            </p>
          </div>
          <div className="flex flex-col gap-[10px]">
            <div className="flex items-center gap-[16px] p-[16px_20px] bg-[var(--surface-2)] border border-[var(--border-1)] rounded-[var(--r-md)]">
              <div className="w-[40px] h-[40px] rounded-[12px] bg-white border border-[var(--border-1)] flex items-center justify-center text-[20px] shrink-0">
                🌐
              </div>
              <div className="flex-1">
                <h5 className="m-0 text-[14px] font-extrabold text-[var(--text-900)]">
                  언어
                </h5>
                <p className="m-0 mt-[2px] text-[12.5px] text-[var(--text-500)]">
                  인터페이스에 표시되는 언어를 변경합니다.
                </p>
              </div>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full max-w-[200px] h-[46px] px-[16px] bg-white border border-[var(--border-2)] rounded-[var(--r-md)] text-[14px] text-[var(--text-900)] outline-none focus:border-[var(--primary-500)] focus:ring-[4px] focus:ring-[var(--primary-50)] transition-all"
              >
                <option>한국어</option>
                <option>English</option>
                <option>日本語</option>
              </select>
            </div>
            <div className="flex items-center gap-[16px] p-[16px_20px] bg-[var(--surface-2)] border border-[var(--border-1)] rounded-[var(--r-md)]">
              <div className="w-[40px] h-[40px] rounded-[12px] bg-white border border-[var(--border-1)] flex items-center justify-center text-[20px] shrink-0">
                🔒
              </div>
              <div className="flex-1">
                <h5 className="m-0 text-[14px] font-extrabold text-[var(--text-900)]">
                  익명 질문 받기
                </h5>
                <p className="m-0 mt-[2px] text-[12.5px] text-[var(--text-500)]">
                  OFF로 두면 새로운 익명 질문 접수가 일시 중지됩니다.
                </p>
              </div>
              <ToggleSwitch
                checked={receiveAnon}
                onChange={() => setReceiveAnon(!receiveAnon)}
              />
            </div>
          </div>
          <div className="flex justify-end gap-[10px] mt-[24px] pt-[20px] border-t border-dashed border-[var(--border-1)]">
            <Button variant="outline">기본값으로 되돌리기</Button>
            <Button variant="primary">설정 저장</Button>
          </div>
        </div>
      </section>
    </main>
  );
}
