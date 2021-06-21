import { ValidationResult } from './valudate.type';

export default function validateLogin(login: string): ValidationResult {
  const result = {
    valid: false,
    message: '',
  };

  if (login.length < 4 || login.length > 20) {
    result.message = 'В логине должено быть от 4 до 20 символов';
    return result;
  }

  if (/^[a-zA-Z0-9]+$/.test(login) === false) {
    result.message = 'В логине должны быть только латинские буквы и цифры';
    return result;
  }

  if (/[a-zA-Z]/.test(login.substr(0, 1)) === false) {
    result.message = 'Логин должен начинаться с буквы';
    return result;
  }

  result.valid = true;
  return result;
}
