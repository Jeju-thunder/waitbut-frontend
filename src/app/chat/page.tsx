'use client';
import Image from 'next/image';
import { Header, Sidebar } from '@/components';
import { SenderMessage, ReceiverMessage } from '@/components/chat';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useChatRoom } from '@/hooks/useChatRoom';
import { ChatEventResponse } from '@/types/chatSocket';
import { useGetChatMessages } from '@/hooks/apis/useGetChatMessages';
export default function Chat() {
  const [isSidebarOpened, setIsSidebarOpened] = useState(false);
  const searchParams = useSearchParams();
  const roomId = Number(searchParams.get('roomId')) || 0;
  const matchingId = Number(searchParams.get('matchingId')) || 0;

  const { chatRoomConnect, chatRoomRequest } = useChatRoom();
  const { data: chatMessages } = useGetChatMessages(roomId);

  const handleSidebarOpen = () => {
    console.log('handleSidebarOpen');
    setIsSidebarOpened(!isSidebarOpened);
  };

  const handleChatEvent = (data: ChatEventResponse) => {
    console.log('handleChatEvent', data);
  };

  useEffect(() => {
    if (roomId) {
      chatRoomConnect({ chatroomId: roomId, handleChatEvent });
      chatRoomRequest({ type: 'join', payload: { chatroom_id: roomId } });
    }
  }, [roomId]);

  const handleSendMessage = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const message = event.currentTarget.value;
      chatRoomRequest({
        type: 'chat',
        payload: { chatroom_id: roomId, matching_id: matchingId, contents: message, created_by: 'user' },
      });
      event.currentTarget.value = '';
    }
  };

  return (
    <div className="w-full h-[800px] relative overflow-hidden">
      <Sidebar
        isSidebarOpened={isSidebarOpened}
        handleSidebarOpen={handleSidebarOpen}
      />
      {/* 사이드바가 열렸을 때 표시될 오버레이 */}

      <div className="w-full h-full relative">
        {/*헤더 영역*/}
        <Header
          title="채팅"
          left={
            <Image
              src="/list.svg"
              alt="list"
              width={24}
              height={24}
            />
          }
          onLeftClick={handleSidebarOpen}
          right={
            <div className="flex gap-2">
              <Image
                src="/new_chat.svg"
                alt="new_chat"
                width={24}
                height={24}
              />
              <Image
                src="/more.svg"
                alt="more"
                width={24}
                height={24}
              />
            </div>
          }
          onRightClick={() => {
            alert('오른쪽');
          }}
        />
        <div className="h-[86px]"></div>
        <div className="bg-gray-50 border-t-[1px] border-gray-200 h-[8px]"></div>
        {/*날짜표시 영역*/}
        <div className="flex justify-center items-center py-[24px]">
          <span className="text-xs text-w-600 rounded-full px-[8px] py-[6px] bg-gray-100">2025.04.15</span>
        </div>
        {/*채팅 영역*/}
        <div className="space-y-4 px-[16px]">
          <div className="flex justify-center"></div>
          {/* Chatbot Message */}
          <ReceiverMessage
            content="‘연인과의 새우 논쟁’이라는 주제에 ‘O’를 선택한 당신, 이 채팅방에는 여러분의 의견에 반대하는 유저와 매칭되었습니다. 지금부터 이 주제로 대화를 나눠보세요! 😊"
            timestamp="오후 05:52"
          />
          {/* User Message */}
          <SenderMessage
            content="안녕. 아니 근데 너는 연인이 이상한테 새우를 정성스럽게 까서 줘도 괜찮다고??"
            timestamp="오후 05:52"
          />
          {/* Another User Message */}
          <SenderMessage
            content="나는 가만히 지켜보기 너무 힘들 것 같은데.."
            timestamp="오후 05:52"
          />

          {/* 메시지 목록 렌더링 */}
          {chatMessages?.chats.map((chat) =>
            chat.createdBy === 'user' ? (                  
              <SenderMessage
                key={chat.id}
                content={chat.content}
                timestamp={new Date(chat.createdAt).toLocaleTimeString('ko-KR', {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                })}
              />
            ) : (
              <ReceiverMessage
                key={chat.id}
                content={chat.content}
                timestamp={new Date(chat.createdAt).toLocaleTimeString('ko-KR', {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                })}
              />
            ),
          )}

          {/* 메시지 입력 영역 */}
          <div className="absolute bottom-0 left-0 right-0 h-[80px] bg-white border-t-[1px] border-gray-200">
            <input
              type="text"
              className="w-full h-full"
              onKeyDown={handleSendMessage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
