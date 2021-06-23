import { HTTPrequest } from '../utils/HTTPrequest';
import { BaseAPI } from './base-api';

const chatMessagesAPIInstance = new HTTPrequest('api/v1/messages');

class ChatMessagesAPI extends BaseAPI {
  request({id}) {
    return chatMessagesAPIInstance.get(`/${id}`);
  }
}