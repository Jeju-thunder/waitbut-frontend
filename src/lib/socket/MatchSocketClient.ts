import SocketClient from "./index";

const MATCH_SOCKET_BASE_URL = process.env.NEXT_PUBLIC_SOCKET_URL;
const MATCH_SOCKET_URL = MATCH_SOCKET_BASE_URL + '/socket/question/match';

export default class MatchSocketClient extends SocketClient {
  constructor() {
    super(MATCH_SOCKET_URL);
  } 
  
}
