import { GetChatMessagesResponse } from '@/types/chat';
import { IApiResponse } from '@/types/common';
import { getAccessToken } from '@/utils/token';
import { useQuery } from '@tanstack/react-query';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// {{url}}/api/chatrooms/:id/chat
const GET_CHAT_MESSAGES_URL = (id: number) => `${BASE_URL}/api/chatrooms/${id}/chat`;
type GetChatMessagesResponseType = IApiResponse<GetChatMessagesResponse>;

const fetchChatMessages = async (id: number): Promise<GetChatMessagesResponse> => {
  const API_TOKEN = getAccessToken();
  const res = await fetch(GET_CHAT_MESSAGES_URL(id), {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const jsonRes: GetChatMessagesResponseType = await res.json();
  return jsonRes.data;
};

export const useGetChatMessages = (id: number) => {
  return useQuery({
    queryKey: ['chatMessages', id],
    queryFn: () => fetchChatMessages(id),
    enabled: !!id,
    staleTime: 0,
    retryDelay: 1000 * 5,
    retry: 3,
  });
};
