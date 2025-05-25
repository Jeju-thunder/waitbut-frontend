import { io, Socket } from "socket.io-client";



// 싱글톤 패턴으로 WebSocket 인스턴스 관리
// socket.io 사용
class SocketClient {
  private static instances: Map<string, Socket> = new Map();
  private path: string;

  constructor(path: string) {
    this.path = path;
  }
  
  public getInstance(): Socket {
    if (!SocketClient.instances.has(this.path)) {
      SocketClient.instances.set(
        this.path,
        io(this.path, {
          transports: ["websocket"],
          autoConnect: false,
        })
      );
    }
    return SocketClient.instances.get(this.path)!;
  }

  public connect(): void {
    const socket = SocketClient.instances.get(this.path);
    if (socket) {
      socket.connect();
    }
  }

  public disconnect(): void {
    const socket = SocketClient.instances.get(this.path);
    if (socket) {
      socket.disconnect();
      SocketClient.instances.delete(this.path);
    }
  }
}

export default SocketClient;
