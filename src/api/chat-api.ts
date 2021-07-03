import { HTTPrequest } from '../utils/HTTPrequest';
import { BaseAPI, baseUrl } from './base-api';
import { ChatUserRequest } from '../controllers/types';

const chatAPIInstance = new HTTPrequest(`${baseUrl}/chats`);

export default class ChatAPI extends BaseAPI {
  public get(): Promise<any> {
    return chatAPIInstance.get('/')
      .then(({ response }) => response);
  }

  create(title: string): Promise<any> {
    const options = {
      data: { title },
    };
    return chatAPIInstance.post('/', options);
  }

  // PUT /chats/users
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
