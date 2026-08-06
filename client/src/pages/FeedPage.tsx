import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FEED_ITEMS } from '@/features/answer';

// 한 페이지에 보여줄 답변 카드 수 (4열 × 2줄)
const PAGE_SIZE = 8;

export default function FeedPage() {
  const [page, setPage] = useState(1);

  // FEED_ITEMS는 이미 최신순으로 정렬된 상태이므로 그대로 잘라 쓴다.
  const totalPages = Math.max(1, Math.ceil(FEED_ITEMS.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pagedItems = FEED_ITEMS.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  return (
    <main className="max-w-[1280px] mx-auto p-[36px_32px_120px]">
      {/* ============================================================
          1. Breadcrumb (경로 안내)
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
        <span className="font-bold text-[var(--text-900)]">공개 답변 피드</span>
      </div>

      {/* ============================================================
          2. 페이지 헤더
          ============================================================ */}
      <section className="bg-white border border-[var(--border-2)] rounded-[var(--r-xl)] p-[28px_32px] shadow-[var(--shadow-sm)] mb-[28px]">
        <h1 className="m-0 mb-[6px] text-[22px] font-extrabold text-[var(--text-900)] tracking-[-0.01em]">
          공개된{' '}
          <span className="bg-gradient-to-r from-[var(--primary-400)] to-[var(--primary-600)] text-transparent bg-clip-text">
            최신 답변
          </span>{' '}
          피드
        </h1>
        <p className="m-0 text-[14px] text-[var(--text-500)]">
          지금까지 공개된 답변{' '}
          <strong className="font-extrabold text-[var(--primary-700)]">
            {FEED_ITEMS.length}개
          </strong>
          . 카드를 클릭하면 해당 유저의 질문함으로 이동합니다.
        </p>
      </section>

      {/* ============================================================
          3. 툴바 — 총 개수 / 정렬 안내 / 페이지 위치
          ============================================================ */}
      <div className="flex justify-between items-center mb-[18px] flex-wrap gap-[12px]">
        <div className="text-[14px] font-semibold text-[var(--text-500)]">
          <strong className="text-[15px] font-extrabold text-[var(--text-900)]">
            {FEED_ITEMS.length}개
          </strong>
          의 답변 · 최신순으로 정렬됩니다
        </div>
        {totalPages > 1 && (
          <div className="text-[13px] font-semibold text-[var(--text-400)]">
            {currentPage} / {totalPages} 페이지
          </div>
        )}
      </div>

      {/* ============================================================
          4. 답변 카드 그리드 (홈 피드와 동일한 카드 형태)
          ============================================================ */}
      <section className="grid grid-cols-4 gap-[18px]">
        {pagedItems.map((item) => (
          <Link
            key={item.id}
            to="/qbox"
            className="bg-[var(--surface)] rounded-[var(--r-lg)] p-[22px] border border-[var(--border-2)] transition-all duration-[180ms] ease-out hover:border-[var(--primary-400)] hover:-translate-y-[2px] flex flex-col shadow-sm hover:shadow-[var(--shadow-md)]"
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
                <span
                  className={`w-[20px] h-[20px] rounded-full shrink-0 bg-gradient-to-br ${item.avatarGradient}`}
                />
                {item.nickname}
              </span>
              <span className="font-semibold">{item.date}</span>
            </div>
          </Link>
        ))}
      </section>

      {/* ============================================================
          5. 페이지네이션 (페이지가 2개 이상일 때만 노출)
          ============================================================ */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-[6px] mt-[32px]">
          <button
            disabled={currentPage === 1}
            onClick={() => setPage(currentPage - 1)}
            className="min-w-[38px] h-[38px] px-[12px] rounded-[10px] bg-white border border-[var(--border-2)] text-[13.5px] font-bold text-[var(--text-900)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed enabled:hover:border-[var(--primary-400)] enabled:hover:text-[var(--primary-600)]"
          >
            ‹ 이전
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className={`min-w-[38px] h-[38px] px-[12px] rounded-[10px] text-[13.5px] font-bold transition-colors ${
                n === currentPage
                  ? 'bg-[var(--primary-500)] text-white shadow-[var(--shadow-brand)]'
                  : 'bg-white border border-[var(--border-2)] text-[var(--text-900)] hover:border-[var(--primary-400)] hover:text-[var(--primary-600)]'
              }`}
            >
              {n}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setPage(currentPage + 1)}
            className="min-w-[38px] h-[38px] px-[12px] rounded-[10px] bg-white border border-[var(--border-2)] text-[13.5px] font-bold text-[var(--text-900)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed enabled:hover:border-[var(--primary-400)] enabled:hover:text-[var(--primary-600)]"
          >
            다음 ›
          </button>
        </div>
      )}
    </main>
  );
}
