// import { LoginFormModel } from './types';
import { IInputBlock } from '../components/input/inputs.type';
import LoginAPI from '../api/login-api';
import { router } from '../router/router';
import { validateAllInputs } from '../utils/validate/index';

const loginApi = new LoginAPI();
// const userLoginValidator = validateLoginFields(validateRules);

class UserLoginController {
  // public async login(data: LoginFormModel) {
  //  
  public async login(inputs: Record<string, IInputBlock>) {
    console.log('---UserLoginController login');
    try {
      // Запускаем крутилку
      console.log('---try');

      if (!validateAllInputs(Object.values(inputs))) {
        console.log('---ne valid');
        throw new Error('данные не прошли валидацию');
      }

      console.log('---data', prepareDataToRequest(inputs));
      const userID = loginApi.signin(prepareDataToRequest(inputs));

      // router.go('/chats');

      // Останавливаем крутилку
    } catch (error) {
      // TO DO YOUR DEALS WITH ERROR
    }
  }
}

export const userLoginController = new UserLoginController();

function prepareDataToRequest(inputs: Record<string, IInputBlock>) {
  const result: Record<string, string> = {};
  const arrInputs = Object.values(inputs);
  arrInputs.forEach(item => {
    result[<string>item.props.name] = item.inputElement.value;
  });
  return result;
}
