// import { LoginFormModel } from './types';
import { IInputBlock } from '../components/pureInput/inputs.type';
import AuthAPI from '../api/auth-api';
import { router } from '../services/router';
import { validateAllInputs } from '../utils/validate/index';
import prepareDataToRequest from '../utils/prepareDataToRequest';

const authAPI = new AuthAPI();

class UserRegistrationController {
  public async signup(inputs: Record<string, IInputBlock>) {
    try {
      if (!validateAllInputs(Object.values(inputs))) {
        throw new Error('данные не прошли валидацию');
      }
      // сравниваю пароли
      const { password, passwordRepeat } = inputs;
      if (password.inputElement.value !== passwordRepeat.inputElement.value) {
        password.getElementForErrorMessage().textContent = 'Пароли не совпадают';
        passwordRepeat.getElementForErrorMessage().textContent = 'Пароли не совпадают';
        return;
      }

      await authAPI.signup(prepareDataToRequest(inputs));

      router.go('/');
    } catch (error) {
      console.warn('Error signup request', error);
    }
  }
}

export const userRegistrationController = new UserRegistrationController();
