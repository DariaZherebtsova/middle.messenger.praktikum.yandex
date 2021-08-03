import { IInputBlock } from '../components/inputWithLabel/inputWithLabel.type';
import AuthAPI from '../api/auth-api';
import { router } from '../services/router';
import { validateAllInputs } from '../utils/validate/index';
import prepareDataToRequest from '../utils/prepareDataToRequest';
import { SignUpRequest } from './types';

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
        const errMsgElPass = password.getElementForErrorMessage();
        const errMsgElPassRep = passwordRepeat.getElementForErrorMessage();
        if (errMsgElPass && errMsgElPassRep) {
          errMsgElPass.textContent = 'Пароли не совпадают';
          errMsgElPassRep.textContent = 'Пароли не совпадают';
        }
        return;
      }

      await authAPI.signup(<SignUpRequest>prepareDataToRequest(inputs));

      router.go('/');
    } catch (error) {
      console.warn('Error signup request', error);
    }
  }
}

export const userRegistrationController = new UserRegistrationController();
