import Image from 'next/image';
import { JSX, ReactNode } from 'react';

export const Header = () => {
  return (
    <div className="h-[56px] w-auto px-4 bg-white items-center flex">
      <div className="items-center justify-start flex justify-self-start">
        <button>
          <Image
            src="/list.svg"
            alt="list-button"
            width={24}
            height={24}
          />
        </button>
      </div>
      <div className="flex items-center justify-center flex-1 space-x-[8px]">
        <Image
          src="/purple_small_chat.svg"
          alt="chat-logo"
          width={24}
          height={24}
        />
        <h2 className="text-purple-700 text-[20px] font-semibold">아니근데</h2>
      </div>
      <div className="items-center flex justify-self-end px-1">
        <button>
          <Image
            src="/human_in_circle.svg"
            alt="list-button"
            width={20}
            height={20}
          />
        </button>
      </div>
    </div>
  );
};

export const QuestionCard = ({
  question,
  children,
}: {
  question: { main: string | JSX.Element; describe: string };
  children?: ReactNode;
}) => {
  return (
    <div className="items-center h-[498px] w-[358px] bg-white justify-center rounded-2xl px-[24px] shadow-md space-y-11">
      <div className="flex-col space-y-[12px]">
        <div className="rounded-full bg-[#FFF599] w-[32px] h-[32px] flex items-center justify-center mx-auto mt-[28px]">
          <Image
            alt="light-balb"
            width={16}
            height={16}
            src="/light_balb.png"
          />
        </div>
        <div className="text-center flex align-center justify-center text-2xl font-extrabold break-keep">
          {question.main}
        </div>
        <div className="text-center flex align-center justify-center text-[#717680] px-2 break-keep">
          {question.describe}
        </div>
      </div>
      {children}
    </div>
  );
};

export const BigOButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <>
      <div className="bg-[#CCE4FF] h-[164px] w-[144px] rounded-md py-[14px] cursor-pointer hover:border-2 hover:border-blue-400 active:border-[#1A88FF]">
        <button
          className="w-full h-full flex flex-col items-center justify-evenly"
          onClick={onClick}
        >
          <Image
            src="/blue_o.svg"
            width={72}
            height={72}
            alt="o"
            className="m-[calc(100px - 72px)]"
          />

          <div className="text-[#007AFF] font-bold text-[28px]">그렇다</div>
        </button>
      </div>
    </>
  );
};

export const BigXButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <>
      <div className="bg-[#FFE3E3] h-[164px] w-[144px] rounded-md py-[14px] cursor-pointer hover:border-2 hover:border-red-400 active:border-[#FC5555]">
        <button
          className="w-full h-full flex flex-col items-center justify-evenly"
          onClick={onClick}
        >
          <Image
            src="/red_x.svg"
            width={66}
            height={66}
            alt="x"
            className="m-[calc(100px - 66px)]"
          />
          <div className="text-[#FC5555] font-bold text-[28px]">아니다</div>
        </button>
      </div>
    </>
  );
};
