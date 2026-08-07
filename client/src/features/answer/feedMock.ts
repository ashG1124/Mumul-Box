// =====================================================================
// [정적 데이터] 공개된 최신 답변 피드
// 홈(상위 4개)과 /feed(전체)가 같은 목록을 공유한다.
// 검색 API가 붙으면 이 파일만 훅으로 교체하면 된다.
// =====================================================================

export interface FeedItem {
  id: number;
  q: string;
  from: string;
  a: string;
  nickname: string;
  date: string;
  avatarGradient: string;
}

// 최신순(date 내림차순)으로 정렬된 상태를 원본으로 유지한다.
export const FEED_ITEMS: FeedItem[] = [
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
  {
    id: 5,
    q: 'Q. 첫 해외여행지로 어디가 좋을까요?',
    from: '- 익명',
    a: 'A. 후쿠오카나 타이베이를 추천해요. 비행 시간이 짧고 한국어 안내가 많아서 돌발 상황에 대응하기 쉽습니다.',
    nickname: '여행작가민',
    date: '2026.05.10',
    avatarGradient: 'from-[#FF9FE0] to-[#B570F4]',
  },
  {
    id: 6,
    q: 'Q. 포트폴리오에 몇 개를 넣는 게 좋아요?',
    from: '- 익명',
    a: 'A. 3개면 충분해요. 대신 각각의 문제 정의와 결과 수치를 정확히 쓰세요. 개수보다 깊이가 훨씬 잘 보입니다.',
    nickname: '디자인공방',
    date: '2026.05.10',
    avatarGradient: 'from-[#FFB6E1] to-[var(--primary-300)]',
  },
  {
    id: 7,
    q: 'Q. 아침형 인간이 되는 법이 있을까요?',
    from: '- 익명',
    a: 'A. 기상 시간을 당기는 대신 취침 시간을 먼저 고정했어요. 일주일에 15분씩만 앞당기면 몸이 덜 저항합니다.',
    nickname: '루틴메이커',
    date: '2026.05.09',
    avatarGradient: 'from-[#9EE7D8] to-[#22C29A]',
  },
  {
    id: 8,
    q: 'Q. 영상 편집은 어떤 툴로 시작하나요?',
    from: '- 익명',
    a: 'A. 처음엔 CapCut으로 컷 편집만 익히세요. 색 보정이 궁금해질 때쯤 DaVinci Resolve로 넘어가면 됩니다.',
    nickname: '여행PD박',
    date: '2026.05.09',
    avatarGradient: 'from-[#8DCBFF] to-[var(--primary-600)]',
  },
  {
    id: 9,
    q: 'Q. 이직 준비는 언제부터 시작해야 할까요?',
    from: '- 익명',
    a: 'A. 이직 생각이 든 날부터요. 당장 지원하지 않더라도 이력서를 최신 상태로 두면 선택지가 생깁니다.',
    nickname: '커리어멘토',
    date: '2026.05.08',
    avatarGradient: 'from-[#C9B6FF] to-[#8961F4]',
  },
  {
    id: 10,
    q: 'Q. 혼자 여행 다닐 때 안 심심하세요?',
    from: '- 익명',
    a: 'A. 하루에 한 가지 목표만 정해두면 심심할 틈이 없어요. 저는 "카페 한 곳 찾기"로 시작합니다.',
    nickname: '백패커여행',
    date: '2026.05.08',
    avatarGradient: 'from-[#FFD66B] to-[#FF8E47]',
  },
  {
    id: 11,
    q: 'Q. 운동 습관은 어떻게 만드셨어요?',
    from: '- 익명',
    a: 'A. 강도를 낮추고 빈도를 높였어요. 20분씩 주 5회가 1시간씩 주 2회보다 훨씬 오래 갑니다.',
    nickname: '홈트관리자',
    date: '2026.05.07',
    avatarGradient: 'from-[#9EE7D8] to-[#22C29A]',
  },
  {
    id: 12,
    q: 'Q. 사진 보정은 어디까지가 적당할까요?',
    from: '- 익명',
    a: 'A. 그날 눈으로 본 밝기까지가 기준이에요. 색을 더하기보다 방해되는 요소를 덜어내는 쪽이 오래 봐도 안 질립니다.',
    nickname: '여행스타그램',
    date: '2026.05.07',
    avatarGradient: 'from-[#FFB6E1] to-[var(--primary-300)]',
  },
  {
    id: 13,
    q: 'Q. 구독자가 늘지 않아요. 뭐가 문제일까요?',
    from: '- 익명',
    a: 'A. 첫 15초를 확인해보세요. 대부분 본론까지 너무 오래 걸립니다. 준비 과정은 과감히 잘라내세요.',
    nickname: '여행유튜버J',
    date: '2026.05.06',
    avatarGradient: 'from-[var(--primary-300)] to-[var(--primary-500)]',
  },
  {
    id: 14,
    q: 'Q. 사이드 프로젝트는 어떻게 끝까지 하나요?',
    from: '- 익명',
    a: 'A. 범위를 절반으로 줄이고 공개 날짜를 먼저 정했어요. 마감이 있으면 완성도가 알아서 따라옵니다.',
    nickname: '개발자수첩',
    date: '2026.05.06',
    avatarGradient: 'from-[var(--info)] to-[var(--primary-500)]',
  },
  {
    id: 15,
    q: 'Q. 호텔 고를 때 가장 중요한 기준은?',
    from: '- 익명',
    a: 'A. 위치 > 침구 > 조식 순이에요. 이동 시간이 짧아지면 하루에 쓸 수 있는 시간이 통째로 늘어납니다.',
    nickname: '호캉스여신',
    date: '2026.05.05',
    avatarGradient: 'from-[#FF9FE0] to-[#B570F4]',
  },
  {
    id: 16,
    q: 'Q. 책을 읽어도 기억에 안 남아요.',
    from: '- 익명',
    a: 'A. 다 읽고 요약하지 말고, 한 챕터가 끝날 때마다 두 문장으로 적어보세요. 남는 양이 확실히 달라져요.',
    nickname: '밑줄긋는사람',
    date: '2026.05.05',
    avatarGradient: 'from-[#C9B6FF] to-[#8961F4]',
  },
  {
    id: 17,
    q: 'Q. 저예산 여행에서 제일 아낄 수 있는 항목은?',
    from: '- 익명',
    a: 'A. 숙소보다 이동비예요. 도시를 자주 옮기지 않는 것만으로 예산의 30%가 남습니다.',
    nickname: '백패커여행',
    date: '2026.05.04',
    avatarGradient: 'from-[#FFD66B] to-[#FF8E47]',
  },
  {
    id: 18,
    q: 'Q. 면접에서 긴장을 덜 하는 방법 있나요?',
    from: '- 익명',
    a: 'A. 답변을 외우지 말고 사례를 3개만 준비했어요. 질문이 달라져도 같은 경험으로 설명할 수 있어서 마음이 편해집니다.',
    nickname: '커리어멘토',
    date: '2026.05.04',
    avatarGradient: 'from-[#C9B6FF] to-[#8961F4]',
  },
  {
    id: 19,
    q: 'Q. 제주도 렌터카 없이도 다닐 만한가요?',
    from: '- 익명',
    a: 'A. 한 지역에 오래 머문다면 충분해요. 다만 하루에 두 지역을 넘기면 버스 배차 간격에서 시간이 다 새어나갑니다.',
    nickname: '국내여행지킴',
    date: '2026.05.03',
    avatarGradient: 'from-[var(--primary-400)] to-[var(--primary-600)]',
  },
  {
    id: 20,
    q: 'Q. 익명 질문 받으면 상처받지 않으세요?',
    from: '- 익명',
    a: 'A. 답할 질문을 고르는 것도 제 권리라고 생각해요. 답하고 싶은 질문에만 답하면 오히려 즐거워집니다.',
    nickname: '고민상담소',
    date: '2026.05.03',
    avatarGradient: 'from-[var(--info)] to-[var(--primary-500)]',
  },
];
