// Access Token 저장소 — 서버가 Bearer 토큰을 내려주므로 FE가 직접 보관한다.
// (서버에 Refresh Token/쿠키 인증이 추가되면 이 파일만 교체하면 된다.)
const ACCESS_TOKEN_KEY = 'mumulbox.accessToken';

export function getAccessToken(): string | null {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function setAccessToken(token: string): void {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
}

export function clearAccessToken(): void {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}
