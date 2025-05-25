import { useQuery } from '@tanstack/react-query';
import { IApiResponse } from '@/types/common';
import { Questions } from '@/types/question';
import { getAccessToken } from '@/utils/token';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const GET_CHAT = BASE_URL + '/api/question';
type GetQuestionResponseType = IApiResponse<Questions>;

const fetchQuestions = async (): Promise<Questions> => {
  const API_TOKEN = getAccessToken();
  const res = await fetch(GET_CHAT, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const jsonRes: GetQuestionResponseType = await res.json();
  return jsonRes.data;
};

export const useGetQuestion = () => {
  return useQuery({
    queryKey: ['questions'],
    queryFn: fetchQuestions,
  });
};
