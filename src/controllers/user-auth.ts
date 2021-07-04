// import { LoginFormModel } from './types';
import { IInputBlock } from '../components/inputWithLabel/inputWithLabel.type';
import AuthAPI from '../api/auth-api';
import { router } from '../services/router';
import { validateAllInputs } from '../utils/validate/index';
import prepareDataToRequest from '../utils/prepareDataToRequest';
import { globalStore } from '../store/globalStore';

const authAPI = new AuthAPI();
// const userLoginValidator = validateLoginFields(validateRules);

class UserAuthController {
  // public async login(data: LoginFormModel) {
  public async signin(inputs: Record<string, IInputBlock>) {
    console.log('---UserAuthController signin');
    try {
      if (!validateAllInputs(Object.values(inputs))) {
        throw new Error('данные не прошли валидацию');
      }

      await authAPI.signin(prepareDataToRequest(inputs));
      console.log('---go /');
      router.go('/');
    } catch (error) {
      // TO DO YOUR DEALS WITH ERROR
    }
  }

  public async getUserInfo() {
    console.log('---UserAuthController getUserInfo');
    try {
      // Запускаем крутилку
      console.log('---try');

      const { response } = await authAPI.getUserInfo();
      console.log('---------------response', response);

      const data = JSON.parse(response);
      console.log('--data', data);

      globalStore.setStore('userId', data.id);
      globalStore.setStore('userInfo', data);

      return data.id;

      // Останавливаем крутилку
    } catch (error) {
      // TO DO YOUR DEALS WITH ERROR
    }
  }

  public async logout() {
    console.log('---UserAuthController logout');
    try {
      // Запускаем крутилку
      console.log('---try');

      const result = await authAPI.logout();

      router.go('/chats');

      // Останавливаем крутилку
    } catch (error) {
      // TO DO YOUR DEALS WITH ERROR
    }
  }
}

export const userAuthController = new UserAuthController();
