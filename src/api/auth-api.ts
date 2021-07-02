import { HTTPrequest } from '../utils/HTTPrequest';
import { BaseAPI, baseUrl } from './base-api';
import { SignInRequest, SignUpRequest } from '../controllers/types';

const authAPIInstance = new HTTPrequest(`${baseUrl}/auth`);

export default class AuthAPI extends BaseAPI {
  public signin(user: SignInRequest): Promise<Record<string, string>> {
    console.log('---AuthAPI signin');
    const options = {
      data: user,
    };
    return authAPIInstance.post('/signin', options)
      .then(({ user_id }) => user_id); // Обрабатываем получение данных из сервиса далее
  }

  public signup(user: SignUpRequest): Promise<Record<string, string>> {
    console.log('---AuthAPI signup');
    const options = {
      data: user,
    };
    return authAPIInstance.post('/signup', options)
      .then(({ user_id }) => user_id); // Обрабатываем получение данных из сервиса далее
  }

  public getUserInfo() {
    console.log('---AuthAPI getUserInfo');

    return authAPIInstance.post('/user')
      .then((response) => response); // Обрабатываем получение данных из сервиса далее
  }

  public logout(): Promise<Record<string, string>> {
    console.log('---AuthAPI logout');

    return authAPIInstance.post('/logout')
      .then(({ ok }) => ok); // Обрабатываем получение данных из сервиса далее
  }
}
