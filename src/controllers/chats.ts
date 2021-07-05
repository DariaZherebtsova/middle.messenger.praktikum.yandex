import ChatAPI from '../api/chat-api';
import { globalStore } from '../store/globalStore';
import { router } from '../services/router';
import noImgAvatar from '../../static/img/no_img_circle.svg';
import { userAuthController } from './user-auth';

const chatAPI = new ChatAPI();

class ChatController {
  public async get() {
    try {
      const answer = await chatAPI.get();
      const chats = JSON.parse(answer);
      chats.forEach(chat => {
        chat.last_message = JSON.parse(chat.last_message);
      });
      globalStore.setStore('chats', chats);
      return chats;
    } catch (error) {
      console.warn('Error ChatController get request', error);
    }
  }

  public async getChats() {
    let chats = globalStore.getStore('chats');
    if (chats.length) {
      return chats;
    }
    return this.get();
  }

  getDataForChats() {
    const result = globalStore.getStore('chats').map((item) => {
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

  setCurrentChat(chatInfo) {
    globalStore.setStore('currentChat', chatInfo);
    globalStore.setStore('currentChatId', chatInfo.id);
    const lastMsg = JSON.parse(chatInfo.last_message);
    globalStore.setMessages([lastMsg]);
    globalStore.setStore('lastMessage', lastMsg);
  }

  getLastMessage() {
    return globalStore.getStore('lastMessage');
  }

  getMessages() {
    return globalStore.getStore('messages');
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
  }

  async getParamsForWebSoket() {
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

  public async addUsers(users) {
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

  public async getChatToken(chatId): Promise<any> {
    try {
      const { response } = await chatAPI.getChatToken(chatId);
      const tokenObj = JSON.parse(response);
      return tokenObj.token;
    } catch (error) {
      console.warn('Error ChatController getChatToken', error);
    }
  }
}

export const chatController = new ChatController();
