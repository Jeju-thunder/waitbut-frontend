"use client";

import Image from "next/image";
import { getChatList } from "@/api/fetchers";
import { useEffect } from "react";

const Sidebar = ({
  isSidebarOpened,
  handleSidebarOpen,
}: {
  isSidebarOpened: boolean;
  handleSidebarOpen: () => void;
}) => {
  console.log("Sidebar");
  const currentChat = "바쁜 어피치";

  useEffect(() => {
    const fetchData = async () => {
      const data = await getChatList();
      console.log(data);
    };
    fetchData();
  }, []);

  const sampleChatList1 = [
    {
      id: 1,
      name: "바쁜 어피치",
      message: "그래 너의 입장도 어느 정도 이해가 안되는데????",
      time: new Date(),
    },
    {
      id: 2,
      name: "나쁜 프로도",
      message: "아니 근데 너는 연인이 이상한테 새우를 정성스럽게 까서 줘도 괜찮다고??",
      time: new Date(),
    },
    {
      id: 3,
      name: "헬로 라이언",
      message: "나는 가만히 지켜보기 너무 힘들 것 같은데..",
      time: new Date(),
    },
    {
      id: 4,
      name: "친구 오레오",
      message: "그러면 내가 너의 연인이랑 대화해줄게",
      time: new Date(),
    },
  ];

  const sampleChatList = sampleChatList1.concat(sampleChatList1).concat(sampleChatList1).concat(sampleChatList1);
  return (
    <>
      <div
        className={`${
          isSidebarOpened ? "translate-x-0" : "-translate-x-full"
        } absolute transition-transform duration-300 ease-in-out top-0 left-0 h-full w-[340px] bg-white z-50 max-w-full shadow-lg`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between py-[16px] px-[16px]">
            <div className="flex items-center justify-between w-full gap-2">
              <span className="flex items-center gap-2 text-gray-900 font-bold">
                <Image src="/chat_purple.svg" alt="chat_history" width={24} height={24} />
                나의 대화내역
              </span>
              <Button
                text="편집"
                onClick={() => {
                  console.log("채팅 내역 편집");
                }}
              />
            </div>
          </div>

          {/* list */}
          <div className="flex items-center flex-col overflow-y-auto">
            {sampleChatList.map((item, idx) => (
              <ChatListItem
                key={item.id + idx.toString()}
                name={item.name}
                message={item.message}
                time={item.time}
                isFocused={currentChat === item.name}
              />
            ))}
          </div>
        </div>
      </div>

      {isSidebarOpened && <div className="fixed inset-0 bg-white opacity-50 z-40" onClick={handleSidebarOpen} />}
    </>
  );
};

export default Sidebar;

const ChatListItem = ({
  name,
  message,
  time,
  isFocused,
}: {
  name: string;
  message: string;
  time: Date;
  isFocused: boolean;
}) => {
  return (
    <div
      className={`flex items-center gap-3 w-full py-[16px] px-[16px] hover:bg-purple-50 cursor-pointer group ${
        isFocused ? "bg-purple-50" : ""
      }`}
    >
      <div className="flex items-center">
        <div className="w-[32px] h-[32px] rounded-full bg-gray-100 group-hover:bg-gray-50"></div>
      </div>
      <div className="flex flex-col items-start gap-2 w-full">
        <div className="flex items-start gap-2 justify-between w-full">
          <span className="text-sm font-bold group-hover:text-purple-700">{name}</span>
          <span className="text-xs text-gray-500">
            {time.toLocaleString("ko-KR", { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>
        <span className="text-xs text-gray-500 group-hover:text-gray-700">{message}</span>
      </div>
    </div>
  );
};

const Button = ({ text, onClick }: { text: string; onClick: () => void }) => {
  return (
    <button className={`text-xs border border-gray-300 rounded-sm px-[8px] py-[6px] bg-white`} onClick={onClick}>
      {text}
    </button>
  );
};

// <div className="absolute top-0 left-0 h-full border border-gray-900 w-[30px] bg-white z-1000 max-w-full transform -translate-x-full transition-transform duration-300 ease-in-out">
//   <div className="flex flex-col h-full">
//     <div className="flex items-center justify-between p-4">
//       <h1 className="text-2xl font-bold">Sidebar</h1>
//     </div>
//     <div className="flex-1 overflow-y-auto">
//       <ul className="p-4">
//         <li className="mb-4">
//           <a href="#" className="text-blue-500 hover:text-blue-600">
//             Home
//           </a>
//         </li>
//         <li className="mb-4">
//           <a href="#" className="text-blue-500 hover:text-blue-600">
//             About
//           </a>
//         </li>
//       </ul>
//     </div>
//   </div>
// </div>
