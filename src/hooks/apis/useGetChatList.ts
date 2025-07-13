import { getChatList } from '@/api/fetchers';
import { ChatRoomList } from '@/types/chat';
import { useQuery } from '@tanstack/react-query';

export const useGetChatList = () => {
  return useQuery<ChatRoomList>({
    queryKey: ['chatrooms'],
    queryFn: getChatList,
    staleTime: 1000 * 60 * 5,
  });
};
