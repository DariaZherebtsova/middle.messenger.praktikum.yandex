import { HTTPrequest } from '../utils/HTTPrequest';
import { baseUrl } from './base-api';
import { SignInRequest, SignUpRequest } from '../controllers/types';

const authAPIInstance = new HTTPrequest(`${baseUrl}/auth`);

export default class AuthAPI {
  public signin(user: SignInRequest): Promise<Record<string, string>> {
    const options = {
      data: user,
    };
    return authAPIInstance.post('/signin', options)
      .then(({ user_id }) => user_id);
  }

  public signup(user: SignUpRequest): Promise<Record<string, string>> {
    const options = {
      data: user,
    };
    return authAPIInstance.post('/signup', options)
      .then(({ user_id }) => user_id);
  }

  public getUserInfo(): Promise<unknown> {
    return authAPIInstance.get('/user')
      .then((response) => response);
  }

  public logout(): Promise<unknown> {
    return authAPIInstance.post('/logout');
  }
}
