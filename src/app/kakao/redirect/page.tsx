"use client";
import {useEffect, useState} from "react";
import { useRouter } from "next/navigation";
export default function Callback() {
  const [info, setInfo] = useState("");
  const router = useRouter();
  useEffect(() => {
    const getUserInfo = () => {
      const url = new URL(window.location.href);
      const params = url.searchParams;
      return params;
    };
    const kakaoLogin = async (code: string) => {
        const response = await fetch(`http://localhost:8080/api/auth/kakao/callback?code=${code}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json;charset=utf-8", //json형태로 데이터를 보내겠다는뜻
            "Access-Control-Allow-Origin": "*", //이건 cors 에러때문에 넣어둔것. 당신의 프로젝트에 맞게 지워도됨
          },
        });

        if (response.ok) {
          const res = await response.json();
          console.log(res);
          //계속 쓸 정보들( ex: 이름) 등은 localStorage에 저장해두자
          localStorage.setItem("name", res.data.account.kakaoName);
          //로그인이 성공하면 이동할 페이지
          router.push("/");
        } else {
          console.error('Error:', response.statusText);
        }
      };

    const userInfo = getUserInfo();
    if (userInfo) {
      console.log({userInfo});
      const token = userInfo.get("code");
      console.log("token", token);
      
      if (token) {
        setInfo(token);

        kakaoLogin(token);
        // navigate("/onboarding", {replace: true});
      }
    }
  }, []);

  return <div>{info || "없어요"}</div>;
}
