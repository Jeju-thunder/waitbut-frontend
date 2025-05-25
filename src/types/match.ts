// 매칭 상태를 명확하게 표현하는 enum 추가
export enum MatchStatus {
  WAITING = 'WAITING',
  CANCELLED = 'CANCELLED',
  SUCCESS = 'SUCCESS',
  TIMEOUT = 'TIMEOUT',
  ALREADY_IN_PROGRESS = 'ALREADY_IN_PROGRESS',
}

// eslint-disable-next-line
const MATCH_MESSAGE = {
  [MatchStatus.WAITING]: '매칭 대기 중',
  [MatchStatus.CANCELLED]: '매칭을 취소했습니다.',
  [MatchStatus.SUCCESS]: '성공적으로 매칭되었습니다.',
  [MatchStatus.TIMEOUT]: '매칭 시간이 초과되었습니다.',
  [MatchStatus.ALREADY_IN_PROGRESS]: '이미 매칭 대기 중입니다.',
} as const;

type MatchMessage = typeof MATCH_MESSAGE[keyof typeof MATCH_MESSAGE];

interface MatchResponseMessage {
  message: MatchMessage;
}

interface GeneralMatchResponse extends MatchResponseMessage {
  question_id?: number;
}

interface MatchSuccessResponse extends MatchResponseMessage {
  question_id: number;
  other_member_id: number;
  chatroom_id: number;
  matching_id: number;
}

type MatchResponse = GeneralMatchResponse | MatchSuccessResponse;


export type { MatchResponse };
