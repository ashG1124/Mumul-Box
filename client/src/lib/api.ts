// 기본 fetch wrapper — 모든 API 요청은 이 함수를 통해 처리
// BASE_URL은 환경변수로 주입한다.
//   - 개발: 비워두면 vite dev server의 /api 프록시를 타므로 CORS가 없다.
//   - 프로덕션: VITE_API_BASE_URL에 API 서버 주소를 넣는다.
import { clearAccessToken, getAccessToken } from './token';

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';

// 서버 성공 응답 형식: { code, message, data }
interface ApiEnvelope<T> {
  code: number;
  message: string;
  data?: T;
}

// 서버 실패 응답 형식: { code, message } (code는 ErrorCode enum 이름)
interface ApiErrorBody {
  code?: string;
  message?: string;
}

// 화면에서 에러 종류별로 분기할 수 있도록 code와 status를 함께 담는다.
export class ApiError extends Error {
  readonly code: string;
  readonly status: number;

  constructor(code: string, message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.status = status;
  }
}

interface ApiOptions extends RequestInit {
  params?: Record<string, string>;
}

export async function apiFetch<T>(
  endpoint: string,
  options: ApiOptions = {},
): Promise<T> {
  const { params, headers, ...fetchOptions } = options;

  const url = new URL(`${BASE_URL}${endpoint}`, window.location.origin);
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  }

  const token = getAccessToken();

  const res = await fetch(url.toString(), {
    ...fetchOptions,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  });

  if (!res.ok) {
    // 토큰이 만료/위조된 경우 남겨두면 계속 401이 나므로 즉시 폐기
    if (res.status === 401) {
      clearAccessToken();
    }

    const body: ApiErrorBody = await res.json().catch(() => ({}));
    throw new ApiError(
      body.code ?? 'UNKNOWN_ERROR',
      body.message ?? res.statusText,
      res.status,
    );
  }

  // 204 No Content 등 본문이 없는 응답
  if (res.status === 204) {
    return undefined as T;
  }

  // 서버는 항상 { code, message, data } 로 감싸서 내려주므로 data만 반환한다.
  const envelope = (await res.json()) as ApiEnvelope<T>;
  return envelope.data as T;
}
