'use client';
import { setTokens } from '@/utils/token';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import './login.css';
import { useKakaoLogin } from './useKakaoLogin';

export default function Login() {
  const { loginWithKakao } = useKakaoLogin();
  const router = useRouter();
  
  const handleKakaoLogin = () => {
    loginWithKakao();
  };

  // 테스트용 로그인 함수 - 실제 배포 시에는 제거하거나 주석 처리
  const handleTestLogin = async () => {
    const SERVER_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://chat.waitbut.shop";
    
    try {
      const res = await fetch(`${SERVER_URL}/api/auth/local/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          kakaoId: '10', // 테스트용 하드코딩된 값
        }),
      });
      
      if (res.ok) {
        const data = await res.json();
        setTokens({
          userId: data.data.userId,
          accessToken: data.data.accessToken,
          refreshToken: data.data.refreshToken,
        });
        router.push('/question');
      } else {
        console.error('Error:', res.statusText);
        alert('로그인에 실패했습니다.');
      }
    } catch (error) {
      console.error('로그인 중 오류 발생:', error);
      alert('네트워크 오류가 발생했습니다.');
    }
  };

  return (
    <div className="bg-gradient-to-b from-purple-600 to-[#A194FF] w-full h-full">
      <div className="flex flex-col items-center justify-between w-full h-full p-4">
        <div className="flex flex-col items-center">
          {/* 메인 텍스트 */}
          <div className="text-center text-white mt-[195px]">
            <h1 className="text-2xl font-bold">
              오늘의 질문으로 <br />
              익명의 상대와 대화하세요!
            </h1>
          </div>

          {/* 로고 이미지 */}
          <Image
            src="/chat.svg"
            alt="logo"
            width={90}
            height={90}
            className="mt-[40px]"
          />
        </div>

        {/* 하단 영역 */}
        <div className="flex flex-col items-center gap-8 mb-[57px]">
          {/* 카카오 로그인 버튼 */}
          <button
            className="kakao-login-btn"
            onClick={handleKakaoLogin}
          >
            <h2>카카오 계정으로 1초만에 시작하기</h2>
          </button>
          
          {/* 테스트용 로그인 버튼 - 개발 환경에서만 표시 */}
          {process.env.NODE_ENV === 'development' && (
            <button
              className="kakao-login-btn"
              onClick={handleTestLogin}
              style={{ backgroundColor: '#ff6b6b' }} // 테스트용 버튼임을 시각적으로 구분
            >
              <h2>테스트 로그인 (개발용)</h2>
            </button>
          )}

          {/* 하단 텍스트 */}
          <div className="text-white text-xs text-center">
            <span>로그인 시 아래 내용에 동의하는 것으로 간주됩니다.</span>
            <div className="mt-2 space-x-4">
              <a
                href="#"
                className="underline"
              >
                개인정보 처리방침
              </a>
              <a
                href="#"
                className="underline"
              >
                이용약관
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
