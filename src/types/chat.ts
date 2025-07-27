export interface ChatRoom {
  id: number;
  name: string;
}

export interface ChatRoomList {
  chatrooms: ChatRoom[];
}

export interface GetChatMessagesResponse {
  matchingId: number;
  chats: ChatMessage[];
}

export interface ChatMessage {
  id: number;
  content: string;
  createdAt: string;
  createdBy: string;
}
