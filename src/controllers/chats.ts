import ChatAPI from '../api/chat-api';
import { router } from '../services/router';

const chatAPI = new ChatAPI();

class ChatController {
  public async get() {
    console.log('---ChatController get');
    try {
      // Запускаем крутилку
      console.log('---try');

      const chats = await chatAPI.get();

      console.log('--chats', chats);

      // router.go('/chats');

      // Останавливаем крутилку
    } catch (error) {
      // TO DO YOUR DEALS WITH ERROR
    }
  }

  public async create(title: string) {
    console.log('---ChatController create');
    try {
      // Запускаем крутилку
      console.log('---try');

      const chats = await chatAPI.create(title);

      console.log('--chats', chats);

      // router.go('/chats');

      // Останавливаем крутилку
    } catch (error) {
      // TO DO YOUR DEALS WITH ERROR
    }
  }
}

export const chatController = new ChatController();
