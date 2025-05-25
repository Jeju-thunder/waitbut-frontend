"use client";

import { useEffect, useState } from "react";
import { useQuestionMatch } from "@/hooks/useQuestionMatch";

export default function QuestionMatchComponent() {
  const { requestMatch, onMatchResult } = useQuestionMatch();
  const [matchStatus, setMatchStatus] = useState<string>("");

  useEffect(() => {
    // 매칭 결과 구독
    const unsubscribe = onMatchResult((response) => {
      if (response.status === "success") {
        setMatchStatus(`매칭 성공! 매칭된 멤버 ID: ${response.matchedMemberId}`);
      } else {
        setMatchStatus(`매칭 실패: ${response.message}`);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [onMatchResult]);

  const handleMatch = () => {
    // 예시 데이터
    const matchPayload = {
      questionId: 5,
      memberId: 8,
    };

    requestMatch(matchPayload);
    setMatchStatus("매칭 요청 중...");
  };

  return (
    <div className="p-4">
      <button onClick={handleMatch} className="bg-blue-500 text-white px-4 py-2 rounded">
        질문 매칭 시작
      </button>
      <div className="mt-4">
        <p>매칭 상태: {matchStatus}</p>
      </div>
    </div>
  );
}
