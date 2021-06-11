import { ValidationResult } from './valudate.type';
import requred from './requred';
import validateEmail from './email';
import validateLogin from './login';
import validateName from './name';
import validatePhone from './phone';
import validatePassword from './password';

export function validate(value: string, type: string): ValidationResult {
  console.log('validate', value);

  const validateRule = {
    required: requred,
    login: validateLogin,
    password: validatePassword, // доделать
    email: validateEmail,
    phone: validatePhone,
    first_name: validateName,
    second_name: validateName,
  };

  if (validateRule[type]) {
    return validateRule[type](value);
  }

  return {
    valid: true,
    message: '',
  };
}
