import { ValidationResult } from './valudate.type';

export default function requred(value: string): ValidationResult {
  const result = {
    valid: false,
    message: '',
  };
  if (!value.length) {
    result.message = 'Обязательное поле';
    return result;
  }
  result.valid = true;
  return result;
}
