"use client";
import Image from "next/image";
import { Header } from "@/components";

export default function Chat() {
  return (
    <div>
      <Header
        title="채팅"
        left={<Image src="/list.svg" alt="list" width={24} height={24} />}
        onLeftClick={() => {
          alert("왼쪽");
        }}
        right={
          <Image src="/new_chat.svg" alt="new_chat" width={24} height={24} />
        }
        onRightClick={() => {
          alert("왼쪽");
        }}
      />
    </div>
  );
}
