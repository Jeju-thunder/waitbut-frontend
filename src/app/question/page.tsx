'use client';
import { Header, QuestionCard, BigOButton, BigXButton } from './components';
import { useGetQuestion } from '@/hooks/apis/useGetQuestion';
import { handleSubmit } from '@/api/fetchers';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  console.log('question', question);
  const handleAnswer = async (isSelected: string) => {
    try {
      if (!question?.id) return;
      await handleSubmit(question.id, isSelected);
    } catch (error) {
      console.error('Error submitting answer:', error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="bg-purple-600 w-full h-full">
      {/* header */}
      <Header />

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
              <BigOButton onClick={() => handleAnswer("true")} />
              <BigXButton onClick={() => handleAnswer("false")} />
            </div>
          </QuestionCard>
        </div>

        {/* bottom button */}
        <div className="pt-6">
          <button className="bg-purple-600 w-full rounded-2xl text-white text-xl h-16 m- cursor-pointer" onClick={() => handleAnswer("false")}>
          대화 시작하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default TodayQuestion;
