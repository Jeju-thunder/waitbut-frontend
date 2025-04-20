"use client";
import {Header, QuestionCard, BigOButton, BigXButton} from "./components";
import {useGetQuestion} from "@/hooks/apis/useGetQuestion";
// import {Question} from "@/types/question";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const default_question = {
  main: (
    <>
      연인이 이성친구의 <br />
      새우를 까줘도 괜찮다.
    </>
  ),
  describe:
    "당신과 연인은 함께 지인들과 해산물 맛집을 \
방문했어요. 그런데 연인이 옆자리 \
이성 친구에게 자연스레 새우를 까서 건네줘요.",
};

/**
 * @TODO API 테스트 완료 후 데이터 교체
 */
function TodayQuestion() {
  const response = useGetQuestion();
  console.log(response);
  // const sanitizedQuestion = response &&
  //   "questions" in Object.keys(response) && {
  //     main: response.questions[0].title || "",
  //     describe: response.questions[0].content || "",
  //   };

  return (
    <div className="bg-purple-600 w-full h-full">
      {/* header */}
      <Header />

      {/* body */}
      <div className="h-full w-full bg-gradient-to-b from-[#F6F1FF] to-white flex flex-col px-[26px]">
        {/* main text */}
        <div className="py-[36px] text-center items-center text-purple-700 text-[20px] font-semibold">
          어서오세요.
          <br />
          오늘의 질문에 응답해보세요!
        </div>
        {/* question card */}
        <div className="justify-center flex">
          {/* <QuestionCard question={sanitizedQuestion || default_question}> */}
          <QuestionCard question={default_question}>
            <div className="flex space-x-5">
              <BigOButton />
              <BigXButton />
            </div>
          </QuestionCard>
        </div>

        {/* bottom button */}
        <div className="pt-6">
          <button className="bg-purple-600 w-full rounded-2xl text-white text-xl h-16 m-">다른 유저와 대화하기</button>
        </div>
      </div>
    </div>
  );
}

export default TodayQuestion;
