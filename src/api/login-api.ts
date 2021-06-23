import { HTTPrequest } from '../utils/HTTPrequest';
import { BaseAPI } from './base-api';
import { SignInRequest, SignUpRequest } from '../controllers/types';

const authAPIInstance = new HTTPrequest('https://ya-praktikum.tech/api/v2/auth');

export default class LoginAPI extends BaseAPI {
  public signin(user: SignInRequest): Promise<Record<string, string>> {
    console.log('---LoginAPI signin');
    const options = {
      data: user,
    };
    return authAPIInstance.post('/signin', options)
      .then(({user_id}) => user_id); // Обрабатываем получение данных из сервиса далее
  }

  public signup(user: SignUpRequest): Promise<Record<string, string>> {
    console.log('---LoginAPI request');
    const options = {
      data: user,
    };
    return authAPIInstance.post('/signup', options)
      .then(({user_id}) => user_id); // Обрабатываем получение данных из сервиса далее
  }
}
