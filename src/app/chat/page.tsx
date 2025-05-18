"use client";
import Image from "next/image";
import { Header, Sidebar } from "@/components";
import { useState } from "react";
export default function Chat() {
  const [isSidebarOpened, setIsSidebarOpened] = useState(false);
  const handleSidebarOpen = () => {
    console.log("handleSidebarOpen");
    setIsSidebarOpened(!isSidebarOpened);
  };

  return (
    <div className="w-full h-[800px] relative overflow-hidden">
      <Sidebar isSidebarOpened={isSidebarOpened} handleSidebarOpen={handleSidebarOpen} />
      {/* 사이드바가 열렸을 때 표시될 오버레이 */}

      <div className="w-full h-full relative">
        {/*헤더 영역*/}
        <Header
          title="채팅"
          left={<Image src="/list.svg" alt="list" width={24} height={24} />}
          onLeftClick={handleSidebarOpen}
          right={
            <div className="flex gap-2">
              <Image src="/new_chat.svg" alt="new_chat" width={24} height={24} />
              <Image src="/more.svg" alt="more" width={24} height={24} />
            </div>
          }
          onRightClick={() => {
            alert("오른쪽");
          }}
        />
        <div className="h-[86px]"></div>
        <div className="bg-gray-50 border-t-[1px] border-gray-200 h-[8px]"></div>
        {/*날짜표시 영역*/}
        <div className="flex justify-center items-center py-[24px]">
          <span className="text-xs text-w-600 rounded-full px-[8px] py-[6px] bg-gray-100">2025.04.15</span>
        </div>
        {/*채팅 영역*/}
        <div className=" space-y-4 px-[16px]">
          <div className="flex justify-center"></div>
          {/* Chatbot Message */}
          <div className="flex justify-start flex-col">
            <div className="bg-white p-4 rounded-lg shadow-md max-w-xs">
              <p className="text-sm text-gray-800">
                ‘연인과의 새우 논쟁’이라는 주제에 ‘O’를 선택한 당신, 이 채팅방에는 여러분의 의견에 반대하는 유저와
                매칭되었습니다. 지금부터 이 주제로 대화를 나눠보세요! 😊
              </p>
            </div>
            <span className="text-xs text-gray-500 block mt-2">오후 05:52</span>
          </div>

          {/* User Message */}
          <div className="flex justify-end items-end flex-col">
            <div className="bg-purple-600 p-4 rounded-lg shadow-md max-w-xs">
              <p className="text-sm text-white">
                안녕. 아니 근데 너는 연인이 이상한테 새우를 정성스럽게 까서 줘도 괜찮다고??
              </p>
            </div>
            <span className="text-xs text-gray-500 block mt-2">오후 05:52</span>
          </div>

          {/* Another User Message */}
          <div className="flex justify-end items-end flex-col">
            <div className="bg-purple-600 p-4 rounded-lg shadow-md max-w-xs">
              <p className="text-sm text-white">나는 가만히 지켜보기 너무 힘들 것 같은데..</p>
            </div>
            <span className="text-xs text-gray-500 block mt-2">오후 05:52</span>
          </div>
        </div>
      </div>
    </div>
  );
}
