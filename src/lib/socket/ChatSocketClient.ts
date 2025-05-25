import SocketClient from "./index";

const CHAT_SOCKET_BASE_URL = process.env.NEXT_PUBLIC_SOCKET_URL;
const CHAT_SOCKET_URL = CHAT_SOCKET_BASE_URL + '/socket/chat';

export default class ChatSocketClient extends SocketClient {
  constructor() {
    super(CHAT_SOCKET_URL);
  } 
}
