import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "아니근데",
  description: "밸런스 퀴즈 기반 채팅앱, 아니근데",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const newLocal = "sha384-DKYJZ8NLiK8MN4/C5P2dtSmLQ4KwPaoqAfyA/DfmEc1VDxu4yyC7wy6K1Hs90nka";

  return (
    <html lang="ko">
      <head>
        <Script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js"
          integrity={newLocal}
          crossOrigin="anonymous"
        ></Script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <div className="flex bg-gray-100 justify-center items-center h-screen w-screen">
            <div className="flex flex-col justify-center items-center w-[400px] h-[800px] bg-white">
              {/* mobile 화면 레이아웃 */}

              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
