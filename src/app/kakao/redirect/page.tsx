'use client';
import { setTokens } from '@/utils/token';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type LoginState = 'loading' | 'success' | 'error';

export default function Callback() {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://chat.waitbut.shop';
  const [loginState, setLoginState] = useState<LoginState>('loading');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const router = useRouter();

  const getUserInfo = () => {
    const url = new URL(window.location.href);
    const params = url.searchParams;
    return params;
  };

  const handleKakaoCallback = async (code: string) => {
    try {
      console.log('카카오 콜백 처리:', code);
      
      const response = await fetch(`${BASE_URL}/api/auth/kakao/callback?code=${code}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      });

      const res = await response.json();
      console.log('카카오 콜백 응답:', res);

      if (response.ok) {
        // 응답 코드에 따라 처리
        if (res.code === 201) {
          // 새로운 사용자 등록 성공
          console.log('새로운 사용자 등록 성공');
          
          // 토큰 저장
          setTokens({
            accessToken: res.data.accessToken,
            refreshToken: res.data.refreshToken,
            userId: res.data.userId,
          });
          
          setLoginState('success');
          
          // 성공 시 question 페이지로 이동
          setTimeout(() => {
            router.push('/question');
          }, 1000);
        } else if (res.code === 200) {
          // 기존 사용자 로그인 성공
          console.log('기존 사용자 로그인 성공');
          
          // 토큰 저장
          setTokens({
            accessToken: res.data.accessToken,
            refreshToken: res.data.refreshToken,
            userId: res.data.userId || null, // 기존 사용자는 userId가 없을 수 있음
          });
          
          setLoginState('success');
          
          // 성공 시 question 페이지로 이동
          setTimeout(() => {
            router.push('/question');
          }, 1000);
        } else {
          // 예상치 못한 응답 코드
          console.error('예상치 못한 응답 코드:', res.code);
          setErrorMessage('처리 중 오류가 발생했습니다. 다시 시도해주세요.');
          setLoginState('error');
        }
      } else {
        // HTTP 에러 응답
        if (res.code === 403 && res.message === 'Register Blacklist') {
          setErrorMessage('회원가입이 제한된 계정입니다.');
        } else {
          setErrorMessage(res.message || '카카오 인증에 실패했습니다. 다시 시도해주세요.');
        }
        setLoginState('error');
      }
    } catch (error) {
      console.error('카카오 콜백 중 오류 발생:', error);
      setErrorMessage('네트워크 오류가 발생했습니다. 다시 시도해주세요.');
      setLoginState('error');
    }
  };



  useEffect(() => {

    const userInfo = getUserInfo();
    if (userInfo) {
      console.log('URL 파라미터:', userInfo);
      const code = userInfo.get('code');
      console.log('인증 코드:', code);

      if (code) {
        handleKakaoCallback(code);
      } else {
        console.error('인증 코드가 없습니다.');
        setErrorMessage('인증 코드를 찾을 수 없습니다.');
        setLoginState('error');
      }
    } else {
      console.error('URL 파라미터를 찾을 수 없습니다.');
      setErrorMessage('잘못된 접근입니다.');
      setLoginState('error');
    }
  }, [router, BASE_URL]);

  const handleRetry = () => {
    setLoginState('loading');
    setErrorMessage('');
    window.location.href = '/login';
  };



  if (loginState === 'loading') {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center text-gray-500">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-lg">처리 중...</p>
        </div>
      </div>
    );
  }

  if (loginState === 'error') {
    return (
      <div className="flex items-center justify-center">
        <div className="text-center text-gray-500">
          <div className="mb-4">
            <svg className="w-12 h-12 mx-auto text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold mb-2">처리 실패</h2>
          <p className="text-sm mb-6 text-red-200">{errorMessage}</p>
          <button
            onClick={handleRetry}
            className="bg-white text-purple-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  if (loginState === 'success') {
    return (
      <div className="flex items-center justify-center">
        <div className="text-center text-gray-500">
          <div className="mb-4">
            <svg className="w-12 h-12 mx-auto text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-bold mb-2">성공!</h2>
          <p className="text-sm">곧 메인 페이지로 이동합니다...</p>
        </div>
      </div>
    );
  }

  return null;
}

