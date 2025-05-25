// import { useCallback } from "react";
// import SocketClient from "@/lib/socket";

// const SOCKET_URL = "socket/question/match";

// export const useSocket = () => {
//   const connect = useCallback(() => {
//     const socket = SocketClient.getInstance(SOCKET_URL);
//     socket.connect();
//     return socket;
//   }, []);

//   const disconnect = useCallback(() => {
//     SocketClient.disconnect();
//   }, []);

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const subscribe = useCallback((eventName: string, callback: (...args: any[]) => void) => {
//     const socket = SocketClient.getInstance(SOCKET_URL);
//     socket.on(eventName, callback);

//     return () => {
//       socket.off(eventName, callback);
//     };
//   }, []);

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const emit = useCallback((eventName: string, data: any) => {
//     const socket = SocketClient.getInstance(SOCKET_URL);
//     socket.emit(eventName, data);
//   }, []);

//   return {
//     connect,
//     disconnect,
//     subscribe,
//     emit,
//   };
// };
