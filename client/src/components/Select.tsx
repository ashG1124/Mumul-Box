import React, { useEffect, useRef, useState } from 'react';

// 1. 선택지 하나의 모양. icon/desc는 없으면 그냥 생략된다.
export interface SelectOption {
  value: string;
  label: string;
  icon?: string; // 이모지 한 글자 기준
  desc?: string; // 라벨 아래 보조 설명
}

interface SelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string; // value가 options에 없을 때 트리거에 표시
  className?: string;
}

// =====================================================================
// 네이티브 <select>는 열린 목록을 OS가 그려서 디자인 토큰을 못 입힌다.
// 그래서 트리거 버튼 + 팝오버 리스트를 직접 만든 커스텀 셀렉트.
// =====================================================================
export const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder = '선택하세요',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  // 키보드 화살표로 이동 중인 항목 (마우스 호버와 별개)
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

  // 2. 바깥 클릭 / ESC 로 닫기
  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, [isOpen]);

  // 3. 열릴 때 현재 선택된 항목에 커서를 맞춰준다.
  const open = () => {
    const idx = options.findIndex((o) => o.value === value);
    setActiveIndex(idx === -1 ? 0 : idx);
    setIsOpen(true);
  };

  const select = (v: string) => {
    onChange(v);
    setIsOpen(false);
  };

  // 4. 키보드 조작: ↑↓ 이동, Enter/Space 선택, ESC 닫기
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      return;
    }
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        open();
      }
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % options.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + options.length) % options.length);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      select(options[activeIndex].value);
    }
  };

  return (
    <div ref={rootRef} className={`relative ${className}`.trim()}>
      {/* === 트리거 버튼 (닫힌 상태의 select 모양) === */}
      <button
        type="button"
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        onClick={() => (isOpen ? setIsOpen(false) : open())}
        onKeyDown={handleKeyDown}
        className={`w-full h-[46px] pl-[16px] pr-[14px] flex items-center gap-[8px] bg-white border rounded-[var(--r-md)] text-[14px] text-left text-[var(--text-900)] outline-none cursor-pointer transition-all ${
          isOpen
            ? 'border-[var(--primary-500)] ring-[4px] ring-[var(--primary-50)]'
            : 'border-[var(--border-2)] hover:border-[var(--primary-400)]'
        }`}
      >
        {selected?.icon && (
          <span className="text-[15px] leading-none">{selected.icon}</span>
        )}
        <span
          className={`flex-1 truncate font-semibold ${selected ? '' : 'text-[var(--text-400)] font-normal'}`}
        >
          {selected ? selected.label : placeholder}
        </span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          className={`w-[16px] h-[16px] shrink-0 text-[var(--text-400)] transition-transform duration-[180ms] ${isOpen ? '-rotate-180' : ''}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {/* === 팝오버 리스트 === */}
      {isOpen && (
        <ul
          role="listbox"
          className="absolute z-50 top-[calc(100%+6px)] left-0 right-0 p-[6px] m-0 list-none bg-[var(--surface)] border border-[var(--border-2)] rounded-[var(--r-md)] shadow-[var(--shadow-lg)] animate-in fade-in duration-150"
        >
          {options.map((opt, i) => {
            const isSelected = opt.value === value;
            return (
              <li key={opt.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => select(opt.value)}
                  onMouseEnter={() => setActiveIndex(i)}
                  className={`w-full flex items-start gap-[10px] p-[10px_12px] rounded-[var(--r-sm)] text-left cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-[var(--primary-50)]'
                      : activeIndex === i
                        ? 'bg-[var(--surface-2)]'
                        : ''
                  }`}
                >
                  {opt.icon && (
                    <span className="text-[15px] leading-[1.35]">
                      {opt.icon}
                    </span>
                  )}
                  <span className="flex-1">
                    <span
                      className={`block text-[13.5px] font-bold leading-[1.35] ${isSelected ? 'text-[var(--primary-700)]' : 'text-[var(--text-900)]'}`}
                    >
                      {opt.label}
                    </span>
                    {opt.desc && (
                      <span
                        className={`block mt-[2px] text-[12px] font-medium leading-[1.4] ${isSelected ? 'text-[var(--primary-600)]' : 'text-[var(--text-500)]'}`}
                      >
                        {opt.desc}
                      </span>
                    )}
                  </span>
                  {isSelected && (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      className="w-[14px] h-[14px] mt-[3px] shrink-0 text-[var(--primary-500)]"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
