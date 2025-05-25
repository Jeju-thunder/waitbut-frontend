'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { setTokens } from '@/utils/token';

export default function Callback() {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;
  const [info, setInfo] = useState('');
  const router = useRouter();

  useEffect(() => {
    const getUserInfo = () => {
      const url = new URL(window.location.href);
      const params = url.searchParams;
      return params;
    };

    const kakaoLogin = async (code: string) => {
      console.log('code', code);
      const response = await fetch(`${BASE_URL}/api/auth/kakao/callback?code=${code}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      });

      if (response.ok) {
        const res = await response.json();
        console.log(res);
        
        // 토큰 저장
        setTokens({
          accessToken: res.data.accessToken,
          refreshToken: res.data.refreshToken,
          userId: res.data.userId, // TODO: userId 확인 필요
        });
        
        router.push('/question');
      } else {
        console.error('Error:', response.statusText);
      }
    };

    const userInfo = getUserInfo();
    if (userInfo) {
      console.log({ userInfo });
      const token = userInfo.get('code');
      console.log('token', token);

      if (token) {
        setInfo(token);
        kakaoLogin(token);
      }
    }
  }, [router]);

  return <div>{info || '없어요'}</div>;
}

