import ChatAPI from '../api/chat-api';
import { globalStore } from '../store/globalStore';
// import noImgAvatar from '../../static/img/no_img_circle.svg';
import { userAuthController } from './user-auth';
import { ChatsResponse, LastMessage } from './types';
import { router } from '../services/router';
import { WebSocketInitData } from '../services/webSocketService';

const noImgAvatar = 'img/no_img_circle.svg';

const chatAPI = new ChatAPI();

class ChatController {
  public async get() {
    let chats = [];
    try {
      const answer = await chatAPI.get();
      if (answer.status !== 200) {
        return router.go('/auth');
      }

      chats = JSON.parse(answer.response);
      // chats.forEach((chat: ChatsResponse) => {
      //   // eslint-disable-next-line no-param-reassign
      //   chat.last_message = JSON.parse(<string>chat.last_message);
      // });
      globalStore.setStore('chats', chats);
      return chats;
    } catch (error) {
      console.warn('Error ChatController get request', error);
    }
    return chats;
  }

  public async getChats() {
    const chats = globalStore.getStore('chats');
    if (chats.length) {
      return chats;
    }
    return this.get();
  }

  getDataForChats() {
    const result = globalStore.getStore('chats').map((item: ChatsResponse) => {
      // eslint-disable-next-line no-param-reassign
      item.avatar = item.avatar ? item.avatar : `${noImgAvatar}`;
      return item;
    });
    return result;
  }

  getCurrentChat() {
    return globalStore.getStore('currentChat');
  }

  getCurrentChatId() {
    return globalStore.getStore('currentChatId');
  }

  setCurrentChat(chatInfo: ChatsResponse) {
    globalStore.setMessages([chatInfo.last_message]);
    globalStore.setStore('currentChat', chatInfo);
    globalStore.setStore('currentChatId', chatInfo.id);
  }

  getLastMessage() {
    return globalStore.getStore('lastMessage');
  }

  getMessages() {
    return globalStore.getStore('messages');
  }

  setMessages(msgList: LastMessage[]) {
    globalStore.setMessages(msgList);
  }

  async getUserId() {
    const userId = globalStore.getStore('userId');
    if (userId) {
      return userId;
    }
    try {
      const { id } = await userAuthController.getUserInfo();
      return id;
    } catch (error) {
      console.warn('Error ChatController getUserId', error);
    }
    return null;
  }

  async getParamsForWebSoket(): Promise<WebSocketInitData> {
    const userId = await this.getUserId();
    const chatId = this.getCurrentChatId();
    const token = await this.getChatToken(chatId);

    return [userId, chatId, token];
  }

  public async create(title: string) {
    try {
      await chatAPI.create(title);
      // получаем новый список
      await this.get();
    } catch (error) {
      console.warn('Error ChatController create', error);
    }
  }

  public async addUsers(users: number) {
    const data = {
      users: [users],
      chatId: globalStore.getStore('currentChatId'),
    };
    try {
      await chatAPI.addUsers(data);
    } catch (error) {
      console.warn('Error ChatController addUsers', error);
    }
  }

  public async getChatToken(chatId: number): Promise<any> {
    try {
      const { response } = await chatAPI.getChatToken(chatId);
      const tokenObj = JSON.parse(response);
      return tokenObj.token;
    } catch (error) {
      console.warn('Error ChatController getChatToken', error);
    }
    return null;
  }
}

export const chatController = new ChatController();
