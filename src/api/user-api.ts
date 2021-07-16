import { HTTPrequest } from '../utils/HTTPrequest';
import { baseUrl } from './base-api';
import { UserRequest, ChangePasswordRequest } from '../controllers/types';

const userAPIInstance = new HTTPrequest(`${baseUrl}/user`);

export default class UserAPI {
  public profile(user: UserRequest): Promise<string> {
    const options = {
      data: user,
    };
    return userAPIInstance.put('/profile', options)
      .then(({ response }) => response);
  }

  public profileAvatar(formData: FormData): Promise<string> {
    const options = {
      data: formData,
    };
    return userAPIInstance.put('/profile/avatar', options)
      .then(({ response }) => response);
  }

  public password(user: ChangePasswordRequest): Promise<string> {
    const options = {
      data: user,
    };
    return userAPIInstance.put('/password', options)
      .then(({ response }) => response);
  }
}
