'use client';
import { handleSubmit } from '@/api/fetchers';
import { Header } from '@/components';
import { useGetQuestion } from '@/hooks/apis/useGetQuestion';
import Image from 'next/image';
import { BigOButton, BigXButton, QuestionCard } from './components';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Sidebar } from '@/components';


const default_question = {
  title: (
    <>
      연인이 이성친구의 <br />
      새우를 까줘도 괜찮다.
    </>
  ),
  content:
    '당신과 연인은 함께 지인들과 해산물 맛집을 \
방문했어요. 그런데 연인이 옆자리 \
이성 친구에게 자연스레 새우를 까서 건네줘요.',
};

/**
 * @TODO API 테스트 완료 후 데이터 교체
 */
function TodayQuestion() {
  const { data, isLoading, error } = useGetQuestion();
  const question = data?.questions?.[0];
  const router = useRouter();

  const [isSidebarOpened, setIsSidebarOpened] = useState(false);
  const handleSidebarOpen = () => {
    setIsSidebarOpened(!isSidebarOpened);
  };

  const handleAnswer = async (isSelected: string) => {
    try {
      if (!question?.id) return;
      await handleSubmit(question.id, isSelected);
    } catch (error) {
      console.error('Error submitting answer:', error);
    }
  };

  const handleStartConversation = () => {
    console.log('대화 시작하기');
    const url = new URL('/match', window.location.origin);
    url.searchParams.set('questionId', question?.id.toString() || '');
    router.push(url.toString());
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="bg-purple-600 w-full h-full relative overflow-hidden">
      <Sidebar
        isSidebarOpened={isSidebarOpened}
        handleSidebarOpen={handleSidebarOpen}
      />

      {/*헤더 영역*/}
      <Header
        title="대화주제"
        left={
          <Image
            src="/list.svg"
            alt="list"
            width={24}
            height={24}
          />
        }
        onLeftClick={handleSidebarOpen}
        right={
          <Image
            src="/human_in_circle.svg"
            alt="list-button"
            width={20}
            height={20}
          />
        }
        onRightClick={() => {
          router.push('/my-profile');
        }}
      />
      <div className="h-[48px]"></div>
      {/* body */}
      <div className="h-full w-full bg-gradient-to-b from-[#F3EEFE] to-[#AFA4FF] flex flex-col px-[26px]">
        {/* main text */}
        <div className="py-[36px] text-center items-center text-purple-700 text-[20px] font-bold">
          어서오세요.
          <br />
          오늘의 질문에 응답해보세요!
        </div>
        {/* question card */}
        <div className="justify-center flex">
          <QuestionCard question={question || default_question}>
            <div className="flex space-x-5">
              <BigOButton onClick={() => handleAnswer('true')} />
              <BigXButton onClick={() => handleAnswer('false')} />
            </div>
          </QuestionCard>
        </div>

        {/* bottom button */}
        <div className="pt-6">
          <button className="bg-purple-600 w-full rounded-2xl text-white text-xl h-16 m- cursor-pointer" onClick={handleStartConversation}>
          대화 시작하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default TodayQuestion;
