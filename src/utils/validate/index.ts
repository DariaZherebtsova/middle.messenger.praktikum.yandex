import { ValidationResult } from './valudate.type';
import requred from './requred';
import validateEmail from './email';
import validateLogin from './login';
import validateName from './name';
import validatePhone from './phone';
import validatePassword from './password';
import { IInputBlock } from '../../components/input/inputs.type';

export function validate(value: string, type: string): ValidationResult {
  console.log(`validate type=${type} value=${value}`);

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

export function validateAllInputs(inputs: IInputBlock[]): boolean {
  let result = true;
  inputs.forEach((item) => {
    // console.log('input value', item.inputElement.value);
    const resultValidate = validate(item.inputElement.value, item.props.validateRule);
    if (!resultValidate.valid) {
      // eslint-disable-next-line no-param-reassign
      item.getElementForErrorMessage().textContent = resultValidate.message;
      result = false;
    } else {
      console.log('OK');
      // eslint-disable-next-line no-param-reassign
      item.getElementForErrorMessage().textContent = '';
    }
  });
  return result;
}
