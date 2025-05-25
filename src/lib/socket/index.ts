import { io, Socket } from "socket.io-client";

// 싱글톤 패턴으로 WebSocket 인스턴스 관리
// socket.io 사용
class SocketClient {
  private static instance: Socket | null = null;

  public static getInstance(): Socket {
    if (!SocketClient.instance) {
      SocketClient.instance = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3000", {
        transports: ["websocket"],
        autoConnect: false,
      });
    }
    return SocketClient.instance;
  }

  public static disconnect(): void {
    if (SocketClient.instance) {
      SocketClient.instance.disconnect();
      SocketClient.instance = null;
    }
  }
}

export default SocketClient;
