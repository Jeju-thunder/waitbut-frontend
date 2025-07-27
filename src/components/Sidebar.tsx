'use client';
import { deleteChatRoom } from '@/api/fetchers';
import { useGetChatList } from '@/hooks/apis/useGetChatList';
// import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useState } from 'react';

const Sidebar = ({
  isSidebarOpened,
  handleSidebarOpen,
}: {
  isSidebarOpened: boolean;
  handleSidebarOpen: () => void;
}) => {
  const { data, isLoading, error } = useGetChatList();
  const [checked, setChecked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  // const queryClient = useQueryClient();
  const currentChat = '바쁜 어피치';

  const handleToggleSelect = (id: number) => {
    setSelected((prev) => {
      const copy = new Set(prev);
      if (copy.has(id)) copy.delete(id);
      else copy.add(id);
      return copy;
    });
  };

  console.log('Chat List Data:', data);

  const sampleChatList1 = [
    {
      id: 1,
      name: '바쁜 어피치',
      message: '그래 너의 입장도 어느 정도 이해가 안되는데????',
      time: new Date(),
    },
    {
      id: 2,
      name: '나쁜 프로도',
      message: '아니 근데 너는 연인이 이상한테 새우를 정성스럽게 까서 줘도 괜찮다고??',
      time: new Date(),
    },
    {
      id: 3,
      name: '헬로 라이언',
      message: '나는 가만히 지켜보기 너무 힘들 것 같은데..',
      time: new Date(),
    },
    {
      id: 4,
      name: '친구 오레오',
      message: '그러면 내가 너의 연인이랑 대화해줄게',
      time: new Date(),
    },
  ];

  const sampleChatList = sampleChatList1.concat(sampleChatList1);

  const selectedChatRooms = sampleChatList.filter((item) => selected.has(item.id));
  console.log('Selected Chat Rooms:', selectedChatRooms);
  console.log(selected);

  const handleDelete = async () => {
    try {
      const idsToDelete = Array.from(selected);
      await deleteChatRoom(idsToDelete);
      // await queryClient.invalidateQueries(['chatrooms']);
      setSelected(new Set());
      setChecked(false);
    } catch (error) {
      console.error(error);
      alert('채팅방 삭제에 실패했습니다.');
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <>
      <div
        className={`${
          isSidebarOpened ? 'translate-x-0' : '-translate-x-full'
        } absolute transition-transform duration-300 ease-in-out top-0 left-0 h-full w-[340px] bg-white z-50 max-w-full shadow-lg`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between py-[16px] px-[16px]">
            <div className="flex items-center justify-between w-full gap-2">
              <span className="flex items-center gap-2 text-gray-900 font-bold">
                <Image
                  src="/chat_purple.svg"
                  alt="chat_history"
                  width={24}
                  height={24}
                />
                나의 대화내역
              </span>
              {checked ? (
                <Button
                  text="삭제"
                  onClick={() => {
                    if (selected.size === 0) {
                      alert('삭제할 항목을 선택해주세요.');
                      return;
                    }
                    setIsModalOpen(true);
                  }}
                />
              ) : (
                <Button
                  text="편집"
                  onClick={() => {
                    setChecked(true);
                    setSelected(new Set());
                  }}
                />
              )}
            </div>
          </div>

          {/* list */}
          <div className="flex items-center flex-col overflow-y-auto">
            {sampleChatList.map((item, idx) => (
              <ChatListItem
                isChecked={checked}
                isSelected={selected.has(item.id)}
                onToggle={() => handleToggleSelect(item.id)}
                key={item.id + idx.toString()}
                name={item.name}
                message={item.message}
                time={item.time}
                isFocused={currentChat === item.name}
              />
            ))}
          </div>
        </div>
      </div>

      {isSidebarOpened && (
        <div
          className="fixed inset-0 bg-white opacity-50 z-40"
          onClick={handleSidebarOpen}
        />
      )}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setChecked(false);
          }}
          onDelete={handleDelete}
        />
      )}
    </>
  );
};

export default Sidebar;

const ChatListItem = ({
  isChecked = false,
  isSelected = false,
  onToggle,
  name,
  message,
  time,
  isFocused,
}: {
  isChecked: boolean;
  isSelected: boolean;
  onToggle: () => void;
  name: string;
  message: string;
  time: Date;
  isFocused: boolean;
}) => {
  return (
    <div
      className={`flex items-center gap-3 w-full py-[16px] px-[16px] hover:bg-purple-50 cursor-pointer group ${
        isFocused ? 'bg-purple-50' : ''
      }`}
      onClick={onToggle}
    >
      {/* 체크박스 */}
      {isChecked && (
        <input
          type="checkbox"
          checked={isSelected}
          className="w-6 h-6 accent-purple-950 rounded-sm hover:cursor-pointer"
        />
      )}
      <div className="flex items-center">
        <div className="w-[32px] h-[32px] rounded-full bg-gray-100 group-hover:bg-gray-50"></div>
      </div>
      <div className="flex flex-col items-start gap-2 w-full">
        <div className="flex items-start gap-2 justify-between w-full">
          <span className="text-sm font-bold text-gray-600 group-hover:text-purple-700">{name}</span>
          <span className="text-xs text-gray-500">
            {time.toLocaleString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
        <span className="text-xs text-gray-500 group-hover:text-gray-700">
          {message.length > 10 ? `${message.slice(0, 22)}...` : message}
        </span>
      </div>
    </div>
  );
};

const Button = ({ text, onClick }: { text: string; onClick: () => void }) => {
  return (
    <button
      className={`text-xs border border-gray-300 rounded-sm px-[8px] py-[6px] bg-white text-gray-600 hover:cursor-pointer hover:bg-gray-100 transition-colors`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

const Modal = ({ isOpen, onClose, onDelete }: { isOpen: boolean; onClose: () => void; onDelete: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 m-[10px] rounded-lg shadow-lg flex flex-col items-center">
        <h2 className="text-lg font-bold mb-4 text-gray-800 ">채팅방을 삭제하겠습니까?</h2>
        <p className="mb-4 text-gray-600 flex flex-col items-center">
          <span>삭제된 채팅방은 다시 복구할 수 없어요.</span> <span>정말 삭제하시겠어요?</span>
        </p>
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            onClick={onClose}
          >
            취소하기
          </button>
          <button
            className="px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-600"
            onClick={() => {
              onDelete();
              onClose();
            }}
          >
            삭제하기
          </button>
        </div>
      </div>
    </div>
  );
};
