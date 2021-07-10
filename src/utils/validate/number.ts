import { ValidationResult } from './valudate.type';

export default function validateNumber(numbers: string): ValidationResult {
  const result = {
    valid: false,
    message: '',
  };

  if (/^[0-9]+$/.test(numbers) === false) {
    result.message = 'Должны быть только цифры';
    return result;
  }

  result.valid = true;
  return result;
}
