'use client';

// TODO: UI 필요

import { useQuestionMatch } from "@/hooks/useQuestionMatch";
import { MatchResponse } from "@/types/match";
import { redirect, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';


const MATCHING_STATUS = {
  init: 'init',
  ready: 'ready',
  connecting: 'connecting',
  connected: 'connected',
} as const;

type MatchingStatus = typeof MATCHING_STATUS[keyof typeof MATCHING_STATUS]

export default function MatchPage() {
  const searchParams = useSearchParams();
  const questionId = Number(searchParams.get('questionId')) || 0;
  const memberId = Number(searchParams.get('memberId')) || 0;

  const { matchConnect, matchRequest, matchDisconnect } = useQuestionMatch();
  const [matchingStatus, setMatchingStatus] = useState<MatchingStatus>(MATCHING_STATUS.init);

  const [matchingResponse, setMatchingResponse] = useState<MatchResponse | null>(null);

  // 매칭 성공 시 채팅 페이지로 이동
  const onMatch = (response: MatchResponse) => {
    console.log("매칭 성공", response);
    setMatchingResponse(response);

    if ( 'other_member_id' in response ) {
      alert(`/chat/${response.chatroom_id} 로 이동`);
      // TODO: 채팅 페이지 연결 후에 주석 해제
      // redirect(`/chat/${response.chatroom_id}`);
    }
  }

  useEffect(() => {
    if (matchingStatus === MATCHING_STATUS.init) {
      setMatchingStatus(MATCHING_STATUS.ready);
      matchConnect({onMatch})
    }

    return () => {
      if (matchingStatus === MATCHING_STATUS.connected) {
        matchDisconnect();
      }
    }
  }, []);

  useEffect(() => {
    if (matchingStatus === MATCHING_STATUS.ready) {
      matchRequest({ questionId, memberId });
    }
  }, [matchingStatus, questionId, memberId]);


  return (
    <div>
      <h1>Match</h1>
      <p>질문 ID: {questionId}</p>
      <p>회원 ID: {memberId}</p>
      <p>매칭 응답: {matchingResponse?.message}</p>
    </div>
  );
}