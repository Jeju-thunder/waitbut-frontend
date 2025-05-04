// import { PaginationParams } from "@/types/article";

type PaginationParams = {
  start?: number;
  limit?: number;
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;
const TOKEN = process.env.NEXT_PUBLIC_LOGIN_TOKEN!;

const headers = {
  Authorization: `Bearer ${TOKEN}`,
  "Content-Type": "application/json",
};

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
      cache: "no-store", // SSR에서는 항상 최신 데이터를 가져오기 위해 no-store 사용
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

// 게시글 리스트 가져오기
export async function getArticles(pagination: PaginationParams) {
  const params = new URLSearchParams();

  if (pagination.start) params.append("pagination[start]", pagination.start.toString());
  if (pagination.limit) params.append("pagination[limit]", pagination.limit.toString());

  return fetchFromServer(`/api/articles?${params.toString()}`);
}

// 특정 게시글 가져오기
export async function getArticle(id: string) {
  const response = await fetchFromServer(`/api/articles/${id}`);
  return response.data;
}

// 게시글 생성하기
export async function createArticle(data: { title: string; content: string }) {
  try {
    const response = await fetch("/api/articles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          ...data,
          createdDate: new Date().toISOString(),
        },
      }),
    });

    if (!response.ok) {
      throw new Error("게시글을 생성하는 중 오류가 발생했습니다.");
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    throw error instanceof Error ? error : new Error("게시글을 생성하는 중 오류가 발생했습니다.");
  }
}

// 채팅 목록 가져오기
export async function getChatList() {
  if (!TOKEN) {
    throw new Error("토큰이 없습니다.");
  }

  if (!BASE_URL) {
    throw new Error("BASE_URL이 없습니다.");
  }

  try {
    const response = await fetchFromServer("/api/chatrooms");
    console.log(response);
    if (!response.ok) {
      throw new Error("채팅 목록을 가져오는 중 오류가 발생했습니다.");
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error(`Error fetching chat list: ${error}`);
    throw error;
  }
}
