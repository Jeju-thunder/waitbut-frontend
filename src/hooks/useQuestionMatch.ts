import { useCallback, useEffect } from "react";
import { useSocket } from "./useSocket";

interface MatchPayload {
  questionId: number;
  memberId: number;
}

interface MatchResponse {
  status: "success" | "fail";
  message?: string;
  matchedMemberId?: number;
}

export const useQuestionMatch = () => {
  const { connect, disconnect, subscribe, emit } = useSocket();

  useEffect(() => {
    connect();

    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  const requestMatch = useCallback(
    (payload: MatchPayload) => {
      emit("question/match", payload);
    },
    [emit]
  );

  const onMatchResult = useCallback(
    (callback: (response: MatchResponse) => void) => {
      return subscribe("question/match/result", callback);
    },
    [subscribe]
  );

  return {
    requestMatch,
    onMatchResult,
  };
};
