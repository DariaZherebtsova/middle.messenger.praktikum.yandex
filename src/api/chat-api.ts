import { HTTPrequest } from '../utils/HTTPrequest';
import { baseUrl } from './base-api';
import { ChatUserRequest } from '../controllers/types';

const chatAPIInstance = new HTTPrequest(`${baseUrl}/chats`);

export default class ChatAPI {
  get(): Promise<any> {
    return chatAPIInstance.get('/')
      .then((response) => response);
  }

  create(title: string): Promise<any> {
    const options = {
      data: { title },
    };
    return chatAPIInstance.post('/', options);
  }

  addUsers(data: ChatUserRequest): Promise<any> {
    const options = {
      data,
    };
    return chatAPIInstance.put('/users', options);
  }

  getChatToken(chatId: number): Promise<any> {
    return chatAPIInstance.post(`/token/${chatId}`);
  }
}
