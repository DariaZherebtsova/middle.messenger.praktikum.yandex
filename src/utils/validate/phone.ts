import { ValidationResult } from './valudate.type';

export default function validatePhone(phone: string): ValidationResult {
  const result = {
    valid: false,
    message: '',
  };
  const emailRegex = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
  console.log('validatePhone', emailRegex.test(phone));
  if (!emailRegex.test(phone)) {
    result.message = 'Не корректный телефон';
    return result;
  }

  result.valid = true;
  return result;
}
