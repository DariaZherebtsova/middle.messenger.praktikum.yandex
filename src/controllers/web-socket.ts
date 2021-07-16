import { globalStore } from '../store/globalStore';
import { SocketMessage } from './types';

class SocketController {
  getUserInfo() {
    return globalStore.getStore('userInfo')?.login ?? '';
  }

  setMessage(data: SocketMessage) {
    globalStore.addMessage(data);
  }

  setLastMessage(msg: string) {
    globalStore.setStore('lastMessage', msg);
  }
}

export const socketController = new SocketController();
