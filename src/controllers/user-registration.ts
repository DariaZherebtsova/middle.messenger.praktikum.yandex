// import { LoginFormModel } from './types';
import { IInputBlock } from '../components/pureInput/inputs.type';
import AuthAPI from '../api/auth-api';
import { router } from '../services/router';
import { validateAllInputs } from '../utils/validate/index';
import prepareDataToRequest from '../utils/prepareDataToRequest';

const authAPI = new AuthAPI();

class UserRegistrationController {
  public async signup(inputs: Record<string, IInputBlock>) {
    console.log('---UserRegistrationController login');
    try {
      // Запускаем крутилку
      console.log('---try');

      if (!validateAllInputs(Object.values(inputs))) {
        console.log('---ne valid');
        throw new Error('данные не прошли валидацию');
      }

      // сравниваю пароли
      const { password, passwordRepeat } = inputs;
      if (password.inputElement.value !== passwordRepeat.inputElement.value) {
        password.getElementForErrorMessage().textContent = 'Пароли не совпадают';
        passwordRepeat.getElementForErrorMessage().textContent = 'Пароли не совпадают';
        return;
      }

      console.log('---data', prepareDataToRequest(inputs));
      const userID = authAPI.signup(prepareDataToRequest(inputs));

      router.go('/');

      // Останавливаем крутилку
    } catch (error) {
      // TO DO YOUR DEALS WITH ERROR
    }
  }
}

export const userRegistrationController = new UserRegistrationController();
