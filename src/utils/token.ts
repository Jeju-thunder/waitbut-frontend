// 토큰 타입 정의
export type TokenType = {
  accessToken: string;
  refreshToken: string;
};

// 토큰 저장
export const setTokens = (tokens: TokenType) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('accessToken', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
  }
};

// 토큰 가져오기
export const getTokens = (): TokenType | null => {
  if (typeof window !== 'undefined') {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    
    if (accessToken && refreshToken) {
      return { accessToken, refreshToken };
    }
  }
  return null;
};

// access 토큰만 가져오기
export const getAccessToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('accessToken');
  }
  return null;
};

// refresh 토큰만 가져오기
export const getRefreshToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('refreshToken');
  }
  return null;
};

// 토큰 삭제
export const removeTokens = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
};

// 토큰 존재 여부 확인
export const hasTokens = (): boolean => {
  if (typeof window !== 'undefined') {
    return !!(localStorage.getItem('accessToken') && localStorage.getItem('refreshToken'));
  }
  return false;
}; 