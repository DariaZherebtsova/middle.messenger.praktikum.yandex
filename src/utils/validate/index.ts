import { ValidationResult } from './valudate.type';
import requred from './requred';
import validateEmail from './email';
import validateLogin from './login';
import validateName from './name';
import validatePhone from './phone';
import validatePassword from './password';
import validateNumber from './number';
import { IInputBlock } from '../../components/pureInput/inputs.type';

export function validate(value: string, type: string): ValidationResult {
  const validateRule = {
    required: requred,
    login: validateLogin,
    password: validatePassword,
    email: validateEmail,
    phone: validatePhone,
    name: validateName,
    number: validateNumber,
  };

  if (validateRule[type]) {
    return validateRule[type](value);
  }

  return {
    valid: true,
    message: '',
  };
}

export function validateAllInputs(inputs: IInputBlock[]): boolean {
  let result = true;
  inputs.forEach((item) => {
    const resultValidate = validate(item.inputElement.value, item.props.validateRule);
    if (!resultValidate.valid) {
      // eslint-disable-next-line no-param-reassign
      item.getElementForErrorMessage().textContent = resultValidate.message;
      result = false;
    } else {
      // eslint-disable-next-line no-param-reassign
      item.getElementForErrorMessage().textContent = '';
    }
  });
  return result;
}
