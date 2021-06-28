import { HTTPrequest } from '../utils/HTTPrequest';
import { BaseAPI, baseUrl } from './base-api';
import { SignInRequest, SignUpRequest } from '../controllers/types';

const authAPIInstance = new HTTPrequest(`${baseUrl}/auth`);

export default class LoginAPI extends BaseAPI {
  public signin(user: SignInRequest): Promise<Record<string, string>> {
    console.log('---LoginAPI signin');
    const options = {
      data: user,
    };
    return authAPIInstance.post('/signin', options)
      .then(({ user_id }) => user_id); // Обрабатываем получение данных из сервиса далее
  }

  public signup(user: SignUpRequest): Promise<Record<string, string>> {
    console.log('---LoginAPI signup');
    const options = {
      data: user,
    };
    return authAPIInstance.post('/signup', options)
      .then(({ user_id }) => user_id); // Обрабатываем получение данных из сервиса далее
  }

  public logout(): Promise<Record<string, string>> {
    console.log('---LoginAPI logout');

    return authAPIInstance.post('/logout')
      .then(({ ok }) => ok); // Обрабатываем получение данных из сервиса далее
  }
}
