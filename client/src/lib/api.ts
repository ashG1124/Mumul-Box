// 기본 fetch wrapper — 모든 API 요청은 이 함수를 통해 처리
// BASE_URL은 환경변수로 주입 (개발: http://localhost:8080, 프로덕션: API 서버)
const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080';

interface ApiOptions extends RequestInit {
  params?: Record<string, string>;
}

export async function apiFetch<T>(
  endpoint: string,
  options: ApiOptions = {},
): Promise<T> {
  const { params, ...fetchOptions } = options;

  const url = new URL(`${BASE_URL}${endpoint}`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  }

  const res = await fetch(url.toString(), {
    ...fetchOptions,
    credentials: 'include', // HttpOnly Refresh Token 쿠키 자동 전송
    headers: {
      'Content-Type': 'application/json',
      ...fetchOptions.headers,
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(error.message ?? 'API 오류');
  }

  return res.json() as Promise<T>;
}
