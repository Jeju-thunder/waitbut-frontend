declare global {
  interface Window {
    Kakao: {
      Auth: {
        authorize: (options: { redirectUri: string }) => void;
      };
      isInitialized: () => boolean;
      init: (appKey: string) => void;
    };
  }
}

export function useKakaoLogin() {
  const kakaoJsKey = process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY || 'dc5828af980b477c5351545e29b8883f';
  
  // 환경에 따라 리다이렉트 URI 결정
  const getRedirectUri = () => {
    if (typeof window !== 'undefined') {
      // 클라이언트 사이드에서 현재 URL 확인
      const hostname = window.location.hostname;
      
      if (hostname === 'localhost' || hostname === '127.0.0.1') {
        // 개발 환경
        return process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI_DEV || 'http://localhost:3000/kakao/redirect';
      } else {
        // 프로덕션 환경
        return process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI_PROD || 'https://waitbut-frontend-namnameeroos-projects.vercel.app/kakao/redirect';
      }
    }
    
    // 서버 사이드에서는 기본값 사용
    return process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI_DEV || 'http://localhost:3000/kakao/redirect';
  };
  
  const redirectUri = getRedirectUri();
  
  const initializeKakao = () => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(kakaoJsKey);
    }
  };

  const loginWithKakao = () => {
    try {
      initializeKakao();
      console.log('카카오 로그인 리다이렉트 URI:', redirectUri);
      window.Kakao.Auth.authorize({
        redirectUri: redirectUri,
      });
    } catch (error) {
      console.error('카카오 로그인 초기화 실패:', error);
    }
  };

  return { loginWithKakao };
}
