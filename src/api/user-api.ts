import { HTTPrequest } from '../utils/HTTPrequest';
import { BaseAPI, baseUrl } from './base-api';
import { UserRequest, ChangePasswordRequest } from '../controllers/types';

const userAPIInstance = new HTTPrequest(`${baseUrl}/user`);

export default class UserAPI extends BaseAPI {
  public profile(user: UserRequest): Promise<Record<string, string>> {
    console.log('---UserAPI profile');
    const options = {
      data: user,
    };
    return userAPIInstance.put('/profile', options)
      .then(({user_id}) => user_id); // Обрабатываем получение данных из сервиса далее
  }

  public profileAvatar(formData: FormData): Promise<Record<string, string>> {
    console.log('---UserAPI profile');
    const options = {
      data: formData,
    };
    return userAPIInstance.put('/profile/avatar', options)
      .then(({user_id}) => user_id); // Обрабатываем получение данных из сервиса далее
  }

  public password(user: ChangePasswordRequest): Promise<Record<string, string>> {
    console.log('---UserAPI request');
    const options = {
      data: user,
    };
    return userAPIInstance.put('/password', options)
      .then(({user_id}) => user_id); // Обрабатываем получение данных из сервиса далее
  }
}
