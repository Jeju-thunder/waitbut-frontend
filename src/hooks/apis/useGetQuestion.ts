import {IApiResponse} from "@/types/common";
import {Questions} from "@/types/question";

const BASE_URL = "http://34.47.71.14:8080";
const GET_CHAT = BASE_URL + "/api/question";

type GetQuestionResponseType = IApiResponse<Questions[]>;

export const useGetQuestion = async () => {
  const getQuestion = async (): Promise<Questions[] | undefined> => {
    try {
      const res = await fetch(GET_CHAT);
      const jsonRes: GetQuestionResponseType = await res.json();
      return jsonRes.data;
    } catch (error) {
      console.error("Failed to fetch questions:", error);
      return undefined;
    }
  };

  return await getQuestion();
};
