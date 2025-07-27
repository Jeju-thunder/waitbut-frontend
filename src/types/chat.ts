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

// export interface ChatRoom {

// }
