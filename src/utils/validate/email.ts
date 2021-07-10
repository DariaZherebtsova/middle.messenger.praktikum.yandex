import { ValidationResult } from './valudate.type';

export default function validateEmail(email: string): ValidationResult {
  const result = {
    valid: false,
    message: '',
  };
  const emailRegex = /^\S+@\S+$/;
  if (!emailRegex.test(email)) {
    result.message = 'Не корректный email';
    return result;
  }

  result.valid = true;
  return result;
}
