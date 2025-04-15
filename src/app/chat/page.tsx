"use client";
import Image from "next/image";
import { Header } from "@/components";

export default function Chat() {
  return (
    <div className="w-full h-full">
      {/*헤더 영역*/}
      <Header
        title="채팅"
        left={<Image src="/list.svg" alt="list" width={24} height={24} />}
        onLeftClick={() => {
          alert("왼쪽");
        }}
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
      {/* <div className="h-[100px]"></div> */}
      {/* <div className="bg-gray-50 h-2 w-full"></div> */}

      {/*채팅 영역*/}
      <div className="mt-4 space-y-4 px-[16px]">
        <div className="flex justify-center"></div>
        {/* Chatbot Message */}
        <div className="flex justify-start flex-col">
          <div className="bg-white p-4 rounded-lg shadow-md max-w-xs">
            <p className="text-sm text-gray-800">
              ‘연인과의 새우 논쟁’이라는 주제에 ‘O’를 선택한 당신, 이 채팅방에는
              여러분의 의견에 반대하는 유저와 매칭되었습니다. 지금부터 이 주제로
              대화를 나눠보세요! 😊
            </p>
          </div>
          <span className="text-xs text-gray-500 block mt-2">오후 05:52</span>
        </div>

        {/* User Message */}
        <div className="flex justify-end items-end flex-col">
          <div className="bg-purple-600 p-4 rounded-lg shadow-md max-w-xs">
            <p className="text-sm text-white">
              안녕. 아니 근데 너는 연인이 이상한테 새우를 정성스럽게 까서 줘도
              괜찮다고??
            </p>
          </div>
          <span className="text-xs text-gray-500 block mt-2">오후 05:52</span>
        </div>

        {/* Another User Message */}
        <div className="flex justify-end items-end flex-col">
          <div className="bg-purple-600 p-4 rounded-lg shadow-md max-w-xs">
            <p className="text-sm text-white">
              나는 가만히 지켜보기 너무 힘들 것 같은데..
            </p>
          </div>
          <span className="text-xs text-gray-500 block mt-2">오후 05:52</span>
        </div>
      </div>
    </div>
  );
}
