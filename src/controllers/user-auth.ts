// import { LoginFormModel } from './types';
import { IInputBlock } from '../components/pureInput/inputs.type';
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
      // Запускаем крутилку
      console.log('---try');

      if (!validateAllInputs(Object.values(inputs))) {
        console.log('---ne valid');
        throw new Error('данные не прошли валидацию');
      }

      // console.log('---data', prepareDataToRequest(inputs));
      const userID = await authAPI.signin(prepareDataToRequest(inputs));
      console.log('---userID', userID);

      globalStore.setStore('userID', userID);

      // router.go('/chats');

      // Останавливаем крутилку
    } catch (error) {
      // TO DO YOUR DEALS WITH ERROR
    }
  }

  public async getUserInfo() {
    console.log('---UserAuthController getUserInfo');
    try {
      // Запускаем крутилку
      console.log('---try');

      const result = authAPI.getUserInfo();

      globalStore.setStore('userId', result.id);
      globalStore.setStore('userInfo', result);

      return result.id;

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
