// import { LoginFormModel } from './types';
import { IInputBlock } from '../components/pureInput/inputs.type';
import AuthAPI from '../api/auth-api';
import { router } from '../services/router';
import { validateAllInputs } from '../utils/validate/index';
import prepareDataToRequest from '../utils/prepareDataToRequest';

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

      console.log('---data', prepareDataToRequest(inputs));
      const userID = authAPI.signin(prepareDataToRequest(inputs));

      // router.go('/chats');

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

      const result = authAPI.logout();

      router.go('/chats');

      // Останавливаем крутилку
    } catch (error) {
      // TO DO YOUR DEALS WITH ERROR
    }
  }
}

export const userAuthController = new UserAuthController();
