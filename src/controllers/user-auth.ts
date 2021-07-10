import { IInputBlock } from '../components/inputWithLabel/inputWithLabel.type';
import AuthAPI from '../api/auth-api';
import { router } from '../services/router';
import { validateAllInputs } from '../utils/validate/index';
import prepareDataToRequest from '../utils/prepareDataToRequest';
import { globalStore } from '../store/globalStore';
import { SignInRequest } from './types';

const authAPI = new AuthAPI();

class UserAuthController {
  public async signin(inputs: Record<string, IInputBlock>) {
    try {
      if (!validateAllInputs(Object.values(inputs))) {
        throw new Error('данные не прошли валидацию');
      }
      await authAPI.signin(<SignInRequest>prepareDataToRequest(inputs));
      router.go('/');
    } catch (error) {
      console.warn('Error request signin', error);
    }
  }

  public async getUserInfo() {
    let result = null;
    try {
      const answer: any = await authAPI.getUserInfo();
      result = JSON.parse(answer.response);
      globalStore.setStore('userInfo', result);
      globalStore.setStore('avatar', result.avatar);
      globalStore.setStore('userId', result.id);
      return result;
    } catch (error) {
      console.warn('Error request getUserInfo', error);
    }
    return result;
  }

  public async logout() {
    try {
      await authAPI.logout();
      globalStore.clearStore();
    } catch (error) {
      console.warn('Error request logout', error);
    }
  }
}

export const userAuthController = new UserAuthController();
