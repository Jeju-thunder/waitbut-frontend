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
  // const kakaoJsKey = process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY;
  // const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
  const kakaoJsKey = 'dc5828af980b477c5351545e29b8883f';
  const redirectUri = 'http://localhost:3000/kakao/redirect';
  const initializeKakao = () => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(kakaoJsKey as string);
    }
  };

  const loginWithKakao = () => {
    initializeKakao();
    window.Kakao.Auth.authorize({
      redirectUri: redirectUri as string,
    });
  };

  return { loginWithKakao };
}
