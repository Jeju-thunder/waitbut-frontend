import Image from 'next/image';
type ChatHeaderProps = {
  title: string;
  icon: 'partner' | 'chat_purple' | 'me' | 'manager';
};
export const ChatHeader = ({ title, icon }: ChatHeaderProps) => {
  return (
    <div className="flex items-center gap-[8px]">
      <Image
        src={`/${icon}.svg`}
        alt="chat_history"
        width={24}
        height={24}
      />
      <span className="text-sm font-bold text-gray-600">{title}</span>
    </div>
  );
};
