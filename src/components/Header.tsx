import { Text } from "@/components";

interface HeaderProps {
  className?: string;
  onRightClick?: () => void;
  onLeftClick?: () => void;
  title?: string;
  right?: React.ReactNode;
  left?: React.ReactNode;
}

const Header = ({ className, onRightClick, onLeftClick, title, right, left }: HeaderProps) => {
  return (
    <header
      className={`absolute top-0 w-[400px] p-3 text-center bg-white z-10 max-w-full left-1/2 transform -translate-x-1/2 flex justify-between items-center ${className}`}
    >
      <button className="border-none bg-transparent cursor-pointer focus:outline-none" onClick={onLeftClick}>
        {left ? left : null}
      </button>
      {title && <Text className="font-pretendard text-gray-800 text-lg font-bold leading-6 text-center" text={title} />}
      <button className="border-none bg-transparent cursor-pointer focus:outline-none" onClick={onRightClick}>
        {right ? right : null}
      </button>
    </header>
  );
};

export default Header;
