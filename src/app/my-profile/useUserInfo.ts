import { useQuery } from '@tanstack/react-query';

export function useUserInfo() {
  // const TOKEN =
  //   localStorage.getItem("token");
  const TOKEN = process.env.NEXT_PUBLIC_LOGIN_TOKEN;

  const headers = {
    Authorization: `Bearer ${TOKEN}`,
  };

  // const userId = localStorage.getItem("userId") || "3";
  const userId = '1';
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => {
      return fetch(`${BASE_URL}/api/members/${userId}`, { headers }).then((res) => res.json());
    },
    select: (data) => {
      return data.data;
    },
  });
}
