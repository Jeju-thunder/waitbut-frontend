"use client";
// import oauthLogin from "@/hooks/apis/useOauthLogin";
import {useRouter, useSearchParams} from "next/navigation";
import {useEffect} from "react";

export default function Auth() {
  const params = useSearchParams();
  const code = params.get("code");
  const router = useRouter();

  useEffect(() => {
    if (code) {
      console.log(code);
      /**
       * @TODO KAKAO AUTH 로직 확인 필요,
       */
      // const accessToken = oauthLogin.login(code);
      // console.log(accessToken);
      // // oauthLogin.saveToken(accessToken);
      // const token = oauthLogin.getToken();
      // console.log(token);
      // router.push("/question");
    }
  }, [code, router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-2xl font-bold">로그인 중입니다...</div>
    </div>
  );
}
