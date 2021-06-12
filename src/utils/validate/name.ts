import { ValidationResult } from './valudate.type';

export default function validateName(name: string): ValidationResult {
  const result = {
    valid: false,
    message: '',
  };
  const emailRegex = /^([а-яё '-]{1,23}|[a-z '-]{1,23})$/;
  if (!emailRegex.test(name.toLocaleLowerCase())) {
    result.message = 'Не корректное значение';
    return result;
  }

  result.valid = true;
  return result;
}
