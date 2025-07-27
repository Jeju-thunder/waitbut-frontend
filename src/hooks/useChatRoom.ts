import ChatSocketClient from '@/lib/socket/ChatSocketClient';
import {
  CHAT_SOCKET_EVENT,
  ChatEventResponse,
  ChatRoomRequest,
  JoinEventResponse,
  LeaveEventResponse,
} from '@/types/chatSocket';

interface ChatRoomConnectProps {
  chatroomId: number;
  handleJoinEvent?: (data: JoinEventResponse) => void;
  handleChatEvent?: (data: ChatEventResponse) => void;
  handleLeaveEvent?: (data: LeaveEventResponse) => void;
}
export const useChatRoom = () => {
  const chatSocketClient = new ChatSocketClient();

  const chatRoomConnect = (props: ChatRoomConnectProps) => {
    const socket = chatSocketClient.getInstance();
    socket.connect();

    // 채팅방 참여 구독
    socket.on(CHAT_SOCKET_EVENT.join, (data: JoinEventResponse) => {
      console.log({ chatroomId: props.chatroomId, data });
      props.handleJoinEvent?.(data);
    });

    // 채팅 메시지 구독
    socket.on(CHAT_SOCKET_EVENT.chat, (data: ChatEventResponse) => {
      console.log({ chatroomId: props.chatroomId, data });
      props.handleChatEvent?.(data);
    });

    // 채팅방 나가기 구독
    socket.on(CHAT_SOCKET_EVENT.leave, (data: LeaveEventResponse) => {
      console.log({ chatroomId: props.chatroomId, data });
      props.handleLeaveEvent?.(data);
    });
  };

  const chatRoomRequest = <T extends keyof typeof CHAT_SOCKET_EVENT>(request: ChatRoomRequest<T>) => {
    const socket = chatSocketClient.getInstance();
    socket.emit(CHAT_SOCKET_EVENT[request.type], request.payload);
  };

  // 채팅방 연결 해제
  const chatRoomDisconnect = () => {
    const socket = chatSocketClient.getInstance();
    socket.off(CHAT_SOCKET_EVENT.join);
    socket.off(CHAT_SOCKET_EVENT.chat);
    socket.off(CHAT_SOCKET_EVENT.leave);
    socket.disconnect();
  };

  return { chatRoomConnect, chatRoomRequest, chatRoomDisconnect };
};
