import { ValidationResult } from './valudate.type';

export default function validatePassword(password: string): ValidationResult {
  const result = {
    valid: false,
    message: '',
  };

  if (password.length < 8 || password.length > 20) {
    result.message = 'В пароле должено быть от 8 до 20 символов';
    return result;
  }

  result.valid = true;
  return result;
}
