import ChatAPI from '../api/chat-api';
import { globalStore } from '../store/globalStore';
import { router } from '../services/router';
import noImgAvatar from '../../static/img/no_img_circle.svg';
import { ChatsResponse } from './types';

const chatAPI = new ChatAPI();

class ChatController {
  public async get() {
    console.log('---ChatController get');
    try {
      // Запускаем крутилку
      console.log('---try');

      const answer = await chatAPI.get();
      const chats = JSON.parse(answer);
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
}

export const chatController = new ChatController();
