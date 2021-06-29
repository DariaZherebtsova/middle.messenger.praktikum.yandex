// import { LoginFormModel } from './types';
import { IInputBlock } from '../components/pureInput/inputs.type';
import UresAPI from '../api/user-api';
import { router } from '../services/router';
import { validateAllInputs } from '../utils/validate/index';
import prepareDataToRequest from '../utils/prepareDataToRequest';

const userAPI = new UresAPI();
// const userLoginValidator = validateLoginFields(validateRules);

class UserProfileController {
  // public async login(data: LoginFormModel) {
  public async profile(inputs: Record<string, IInputBlock>) {
    console.log('---UserProfileController profile');
    try {
      // Запускаем крутилку
      console.log('---try');

      if (!validateAllInputs(Object.values(inputs))) {
        console.log('---ne valid');
        throw new Error('данные не прошли валидацию');
      }

      // отправляем данные
      console.log('---data', prepareDataToRequest(inputs));
      const userID = userAPI.profile(prepareDataToRequest(inputs));

      // router.go('/chats');

      // Останавливаем крутилку
    } catch (error) {
      // TO DO YOUR DEALS WITH ERROR
    }
  }

  public async profileAvatar(formData: FormData) {
    userAPI.profileAvatar(formData);
  }

  public async password(inputs: Record<string, IInputBlock>) {
    console.log('---UserProfileController password');
    try {
      // Запускаем крутилку
      console.log('---try');

      if (!validateAllInputs(Object.values(inputs))) {
        console.log('---ne valid');
        throw new Error('данные не прошли валидацию');
      }

      // отправляем данные
      console.log('---data', prepareDataToRequest(inputs));
      const userID = userAPI.password(prepareDataToRequest(inputs));

      // router.go('/chats');

      // Останавливаем крутилку
    } catch (error) {
      // TO DO YOUR DEALS WITH ERROR
    }
  }
}

export const userProfileController = new UserProfileController();
