import { IApiResponse } from '@/types/common'
import { Questions } from '@/types/question'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN
const GET_CHAT = BASE_URL + '/api/question'
type GetQuestionResponseType = IApiResponse<Questions[]>

export const useGetQuestion = async () => {
  const getQuestion = async (): Promise<Questions[] | undefined> => {
    try {
      const res = await fetch(GET_CHAT, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      })
      const jsonRes: GetQuestionResponseType = await res.json()
      return jsonRes.data
    } catch (error) {
      console.error('Failed to fetch questions:', error)
      return undefined
    }
  }

  return await getQuestion()
}
