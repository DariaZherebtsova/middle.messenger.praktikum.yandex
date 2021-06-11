import { ValidationResult } from './valudate.type';

export default function validatePassword(password: string): ValidationResult {
  const result = {
    valid: false,
    message: '',
  };

  if (!password.length) {
    result.message = 'Введите пароль';
    return result;
  }

  result.valid = true;
  return result;
}