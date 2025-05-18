'use client'
import Image from 'next/image'
import { useKakaoLogin } from './useKakaoLogin'
import './login.css'

export default function Login() {
  const { loginWithKakao } = useKakaoLogin()
  const handleKakaoLogin = () => {
    loginWithKakao()
  }
  return (
    <div className="bg-purple-600 w-full h-full">
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
            카카오 계정으로 1초만에 시작하기
          </button>

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
  )
}
