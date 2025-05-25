import { useCallback } from "react";
import SocketClient from "@/lib/socket";

export const useSocket = () => {
  const connect = useCallback(() => {
    const socket = SocketClient.getInstance();
    socket.connect();
    return socket;
  }, []);

  const disconnect = useCallback(() => {
    SocketClient.disconnect();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const subscribe = useCallback((eventName: string, callback: (...args: any[]) => void) => {
    const socket = SocketClient.getInstance();
    socket.on(eventName, callback);

    return () => {
      socket.off(eventName, callback);
    };
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const emit = useCallback((eventName: string, data: any) => {
    const socket = SocketClient.getInstance();
    socket.emit(eventName, data);
  }, []);

  return {
    connect,
    disconnect,
    subscribe,
    emit,
  };
};
