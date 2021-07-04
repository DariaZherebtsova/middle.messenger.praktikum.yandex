// --------------
// chatController
// --------------
import ChatAPI from '../api/chat-api';
import { globalStore } from '../store/globalStore';
import { router } from '../services/router';
import noImgAvatar from '../../static/img/no_img_circle.svg';
import { ChatsResponse } from './types';
import { userAuthController } from './user-auth';

const chatAPI = new ChatAPI();

class ChatController {
  public async get() {
    console.log('---ChatController get');
    let chats = globalStore.getStore('chats');
    if (chats.length) {
      return chats;
    }
    try {
      // Запускаем крутилку
      console.log('---try');

      const answer = await chatAPI.get();
      chats = JSON.parse(answer);
      console.log('--chats', chats);
      globalStore.setStore('chats', chats);

      // Останавливаем крутилку
    } catch (error) {
      // TO DO YOUR DEALS WITH ERROR
    }
  }

  getDataForChats() {
    console.log('---getDataForChats');
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
    globalStore.setStore('lastMessage', chatInfo.last_message);
  }

  getLastMessage() {
    return globalStore.getStore('lastMessage');
  }

  getMessages() {
    return globalStore.getStore('messages');
  }

  async getUserId() {
    let userId = globalStore.getStore('userId');
    console.log('');
    if (userId) {
      return userId;
    }
    try {
      userId = await userAuthController.getUserInfo();
      return userId;
    } catch (error) {
      // TO DO YOUR DEALS WITH ERROR
    }
  }

  getFirstRender() {
    return globalStore.getStore('firstRenderMsgFeed');
  }

  setFirstRender(value: boolean) {
    return globalStore.setStore('firstRenderMsgFeed', value);
  }

  async getParamsForWebSoket() {
    const userId = await this.getUserId();
    console.log('--- userId', userId);
    const chatId = this.getCurrentChatId();
    console.log('---chatId', chatId);
    const token = await this.getChatToken(chatId);
    console.log('---tttoken', token);

    return [userId, chatId, token];
  }

  public async create(title: string) {
    console.log('---ChatController create');
    try {
      await chatAPI.create(title);
      // получаем новый список
      this.get();
    } catch (error) {
      // TO DO YOUR DEALS WITH ERROR
    }
  }

  // getCurrentChatId() {
  //    return globalStore.getStore('currentChatId')
  // }

  public async addUsers(users) {
    console.log('---ChatController addUsers', users);
    const data = {
      users: [users],
      chatId: globalStore.getStore('currentChatId'),
    };
    console.log('---currentChatId', data.chatId);
    try {
      await chatAPI.addUsers(data);
    } catch (error) {
      // TO DO YOUR DEALS WITH ERROR
    }
  }

  public async getChatToken(chatId): Promise<any> {
    console.log('--------------------ChatController getChatToken', chatId);
    try {
      const { response } = await chatAPI.getChatToken(chatId);
      console.log('---response', response);
      const tokenObj = JSON.parse(response);
      console.log('---tokenObj', tokenObj);
      return tokenObj.token;
    } catch (error) {
      // TO DO YOUR DEALS WITH ERROR
    }
  }
}

export const chatController = new ChatController();
