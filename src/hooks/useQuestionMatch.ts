import MatchSocketClient from "@/lib/socket/MatchSocketClient";
import { MatchResponse } from "@/types/match";
interface MatchPayload {
  questionId: number;
  memberId: number;
}

// interface MatchResponse {
//   status: "success" | "fail";
//   message?: string;
//   matchedMemberId?: number;
// }


type MatchSubscribeEventName = 'match' | 'cancel_match'
type MatchEventName = 'match'

const SUBSCRIBE_EVENT: Record<string, MatchSubscribeEventName> = {
  match: 'match',
  cancel_match: 'cancel_match'
}
const EVENT_NAME: Record<string, MatchEventName> = {
  match: 'match',
}

export const useQuestionMatch = () => {
  // const { connect, disconnect, subscribe, emit } = useSocket();
  const matchSocketClient = new MatchSocketClient();

  const matchConnect = ({onMatch, onCancelMatch}: {onMatch?: (response: MatchResponse) => void, onCancelMatch?: (data: unknown) => void}) => {

    const socket = matchSocketClient.getInstance();
    socket.connect();

    console.log('match subscribe start')

    socket.on(SUBSCRIBE_EVENT.match, (response: MatchResponse) => {
      console.log('match', response);
      onMatch?.(response);
    });

    socket.on(SUBSCRIBE_EVENT.cancel_match, (data) => {
      console.log('cancel_match', data);
      onCancelMatch?.(data);
    });
  }


  // eslint-disable-next-line 
  const matchRequest = ({questionId, memberId}: MatchPayload) => {
    const socket = matchSocketClient.getInstance();
    socket.emit(EVENT_NAME.match, {
      "questionId": 4, // 질문 id
      "memberId": 2 // member id
  });
    // socket.emit(EVENT_NAME.match, {
    //   questionId,
    //   memberId
    // });
  }

  const matchDisconnect = () => {
    const socket = matchSocketClient.getInstance();
    socket.off(SUBSCRIBE_EVENT.match);
    socket.off(SUBSCRIBE_EVENT.cancel_match);
    socket.disconnect();
  }


  return {
    matchConnect,
    matchRequest,
    matchDisconnect
  };
};
