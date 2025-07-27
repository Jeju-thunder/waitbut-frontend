// interface ChatMessage {

// }

// interface ChatRoom {

// }

/**
 * 채팅 소켓 이벤트
 */
export const CHAT_SOCKET_EVENT: Record<string, string> = {
  join: 'join',
  chat: 'chat',
  leave: 'leave',
};

export type JoinEventRequest = {
  chatroom_id: number;
};
export type ChatEventRequest = {
  chatroom_id: number;
  matching_id: number;
  contents: string;
  created_by: string;
};

export type LeaveEventRequest = {
  chatroom_id: number;
};
export interface ChatRoomRequest<T extends keyof typeof CHAT_SOCKET_EVENT> {
  type: T;
  payload: T extends 'join'
    ? JoinEventRequest
    : T extends 'chat'
    ? ChatEventRequest
    : T extends 'leave'
    ? LeaveEventRequest
    : never;
}

export type JoinEventResponse = unknown;
export type ChatEventResponse = {
  type: 'chat';
  payload: {
    contents: string;
    created_by: string;
    chatroom_id: number;
    matching_id: number;
  };
};
export type LeaveEventResponse = unknown;
