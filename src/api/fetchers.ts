import { ChatRoomList } from '@/types/chat';
import { IApiResponse } from '@/types/common';
import { getAccessToken } from '@/utils/token';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;
const token = getAccessToken();
const headers = {
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
};
console.log(token);

// SSR을 위한 Fetch 함수
async function fetchFromServer(endpoint: string, options?: RequestInit) {
  const url = `${BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...headers,
        ...(options?.headers || {}),
      },
      cache: 'no-store', // SSR에서는 항상 최신 데이터를 가져오기 위해 no-store 사용
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error(`Error fetching from server: ${error}`);
    throw error;
  }
}

// 특정 게시글 가져오기
export async function getArticle(id: string) {
  const response = await fetchFromServer(`/api/articles/${id}`);
  return response.data;
}

// 게시글 생성하기
export async function createArticle(data: { title: string; content: string }) {
  try {
    const response = await fetch('/api/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          ...data,
          createdDate: new Date().toISOString(),
        },
      }),
    });

    if (!response.ok) {
      throw new Error('게시글을 생성하는 중 오류가 발생했습니다.');
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    throw error instanceof Error ? error : new Error('게시글을 생성하는 중 오류가 발생했습니다.');
  }
}

// 답변 제출하기
export async function handleSubmit(questionId: number, isSelected: string) {
  try {
    const response = await fetchFromServer(`/api/question/${questionId}/answer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content: isSelected }),
    });

    if (!response.ok) {
      throw new Error('Failed to submit answer');
    }

    const result = await response.json();
    console.log('Answer submitted:', result);
    return result;
  } catch (error) {
    console.error('Error submitting answer:', error);
    throw error;
  }
}

// 채팅 목록 가져오기
export const getChatList = async (): Promise<ChatRoomList> => {
  if (!getAccessToken()) {
    throw new Error('토큰이 없습니다.');
  }

  if (!BASE_URL) {
    throw new Error('BASE_URL이 없습니다.');
  }

  try {
    const response: IApiResponse<ChatRoomList> = await fetchFromServer('/api/chatrooms');
    const result = await response.data;

    if (response.code !== 200 || response.status !== 'OK') {
      throw new Error(response.message || '채팅 목록을 가져오는 중 오류가 발생했습니다.');
    }
    console.log('getChatList result:', result);
    return result;
  } catch (error) {
    console.error(`Error fetching chat list: ${error}`);
    throw error;
  }
};

// 채팅방 삭제
export const deleteChatRoom = async (ids: number[]) => {
  if (!getAccessToken()) {
    throw new Error('토큰이 없습니다.');
  }

  if (!BASE_URL) {
    throw new Error('BASE_URL이 없습니다.');
  }

  try {
    const response: IApiResponse<void> = await fetchFromServer(`/api/chatrooms?ids=${ids}`, {
      method: 'DELETE',
    });

    if (response.code !== 200 || response.status !== 'OK') {
      throw new Error(response.message || '채팅방을 삭제하는 중 오류가 발생했습니다.');
    }
    console.log(`Chat rooms deleted successfully.`);
  } catch (error) {
    console.error(`Error deleting chat rooms:`, error);
    throw error;
  }
};
