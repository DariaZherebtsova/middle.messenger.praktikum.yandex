// import { LoginFormModel } from './types';
import { IInputBlock } from '../components/input/inputs.type';
import UresAPI from '../api/user-api';
import { router } from '../router/router';
import { validateAllInputs } from '../utils/validate/index';

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

      // отправляем аватар

      // router.go('/chats');

      // Останавливаем крутилку
    } catch (error) {
      // TO DO YOUR DEALS WITH ERROR
    }
  }
}

export const userProfileController = new UserProfileController();

function prepareDataToRequest(inputs: Record<string, IInputBlock>) {
  const result: Record<string, string> = {};
  const arrInputs = Object.values(inputs);
  arrInputs.forEach(item => {
    result[<string>item.props.name] = item.inputElement.value;
  });
  return result;
}
