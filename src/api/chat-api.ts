import { HTTPrequest } from '../utils/HTTPrequest';
import { BaseAPI } from './base-api';

const chatAPIInstance = new HTTPrequest('api/v1/chats');

class ChatAPI extends BaseAPI {
  create() {
    // Здесь уже не нужно писать полный путь /api/v1/chats/
    return chatAPIInstance.post('/', { title: 'string' });
  }

  request() {
    // Здесь уже не нужно писать полный путь /api/v1/chats/
    return chatAPIInstance.get('/full');
  }
}