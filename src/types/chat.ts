export interface ChatRoom {
  id: number;
  matching_id: number;
  created_at: string;
  updated_at: string;
  created_by: string;
  contents: string;
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

// export interface ChatRoom {

// }
