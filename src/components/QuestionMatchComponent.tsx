'use client';

import { useEffect, useState } from 'react';
import { useQuestionMatch } from '@/hooks/useQuestionMatch';
import { MatchResponse } from '@/types/match';

const MATCHING_STATUS = {
  init: 'init',
  ready: 'ready',
  connecting: 'connecting',
  connected: 'connected',
} as const;

type MatchingStatus = (typeof MATCHING_STATUS)[keyof typeof MATCHING_STATUS];

export default function QuestionMatchComponent() {
  const { matchConnect, matchRequest, matchDisconnect } = useQuestionMatch();
  const [matchingStatus, setMatchingStatus] = useState<MatchingStatus>(MATCHING_STATUS.init);

  const [matchingResponse, setMatchingResponse] = useState<MatchResponse | null>(null);

  const onMatch = (response: MatchResponse) => {
    console.log('매칭 성공', response);
    setMatchingResponse(response);
  };

  useEffect(() => {
    if (matchingStatus === MATCHING_STATUS.init) {
      setMatchingStatus(MATCHING_STATUS.ready);
      matchConnect({ onMatch });
    }
    return () => {
      if (matchingStatus === MATCHING_STATUS.connected) {
        matchDisconnect();
      }
    };
  }, []);

  const handleMatch = () => {
    console.log('매칭 요청 클릭');
    if (matchingStatus === MATCHING_STATUS.ready) {
      matchRequest({ questionId: 4, memberId: 2 });
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={handleMatch}
        className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
      >
        질문 매칭 시작
      </button>
      <div className="mt-4">
        <p>매칭 상태: {matchingStatus}</p>
        <p>매칭 응답: {matchingResponse?.message}</p>
      </div>
    </div>
  );
}
