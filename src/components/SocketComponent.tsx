"use client";
import { useEffect, useState } from "react";
import { useSocket } from "@/hooks/useSocket";

interface Message {
  id: string;
  text: string;
  timestamp: number;
}

export default function SocketComponent() {
  const { connect, disconnect, subscribe, emit } = useSocket();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    // 소켓 연결
    connect();

    // 메시지 수신 이벤트 구독
    const unsubscribe = subscribe("receive_message", (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    // 컴포넌트 언마운트 시 정리
    return () => {
      unsubscribe();
      disconnect();
    };
  }, [connect, disconnect, subscribe]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      timestamp: Date.now(),
    };

    emit("send_message", message);
    setInputMessage("");
  };

  return (
    <div className="p-4">
      <div className="mb-4 h-80 overflow-y-auto border rounded p-2">
        {messages.map((message) => (
          <div key={message.id} className="mb-2">
            <p>{message.text}</p>
            <small>{new Date(message.timestamp).toLocaleString()}</small>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className="flex-1 border rounded px-2 py-1"
          placeholder="메시지를 입력하세요..."
        />
        <button onClick={handleSendMessage} className="bg-blue-500 text-white px-4 py-1 rounded">
          전송
        </button>
      </div>
    </div>
  );
}
