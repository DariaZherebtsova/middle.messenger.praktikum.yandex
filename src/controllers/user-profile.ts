import { IInputBlock } from '../components/inputWithLabel/inputWithLabel.type';
import UresAPI from '../api/user-api';
import { router } from '../services/router';
import { validateAllInputs } from '../utils/validate/index';
import prepareDataToRequest from '../utils/prepareDataToRequest';
import { globalStore } from '../store/globalStore';
import { userAuthController } from './user-auth';
import { ChangePasswordRequest, UserRequest } from './types';

const userAPI = new UresAPI();

class UserProfileController {
  public async profile(inputs: Record<string, IInputBlock>) {
    try {
      if (!validateAllInputs(Object.values(inputs))) {
        throw new Error('данные не прошли валидацию');
      }
      const response = await userAPI.profile(<UserRequest>prepareDataToRequest(inputs));
      const result = JSON.parse(response);
      result.avatar = globalStore.getStore('avatar');
      globalStore.setStore('userInfo', result);
      router.go('/profile');
    } catch (error) {
      console.warn('Error request profile', error);
    }
  }

  public async profileAvatar(formData: FormData) {
    try {
      const response = await userAPI.profileAvatar(formData);
      const result = JSON.parse(response);
      globalStore.setStore('userInfo', result);
      globalStore.setStore('avatar', result?.avatar);
      return result?.avatar;
    } catch (error) {
      console.warn('Error request profileAvatar', error);
    }
    return null;
  }

  getAvatar() {
    return globalStore.getStore('avatar');
  }

  public async password(inputs: Record<string, IInputBlock>) {
    try {
      if (!validateAllInputs(Object.values(inputs))) {
        throw new Error('данные не прошли валидацию');
      }
      // сравниваю пароли
      const { newPassword, newPasswordRepeat } = inputs;
      if (newPassword.inputElement.value !== newPasswordRepeat.inputElement.value) {
        const errMsgElNewPass = newPassword.getElementForErrorMessage();
        const errMsgElNewPassRep = newPasswordRepeat.getElementForErrorMessage();
        if (errMsgElNewPass && errMsgElNewPassRep) {
          errMsgElNewPass.textContent = 'Пароли не совпадают';
          errMsgElNewPassRep.textContent = 'Пароли не совпадают';
        }
        return;
      }

      const response = await userAPI.password(<ChangePasswordRequest>prepareDataToRequest(inputs));
      if (response !== 'OK') {
        const result = JSON.parse(response);
        // eslint-disable-next-line consistent-return
        return result.reason;
      }

      router.go('/profile');
    } catch (error) {
      console.warn('Error request password', error);
    }
  }

  async getUserInfo() {
    let userInfo = globalStore.getStore('userInfo');
    if (userInfo !== null) {
      return userInfo;
    }
    userInfo = await userAuthController.getUserInfo();
    return userInfo;
  }
}

export const userProfileController = new UserProfileController();
