import { ValidationResult } from './valudate.type';

export default function validateEmail(email: string): ValidationResult {
  const result = {
    valid: false,
    message: '',
  };
  const emailRegex = /(^$|^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/;
  // console.log(emailRegex.test(email));
  if (!emailRegex.test(email)) {
    result.message = 'Не корректный email';
    return result;
  }

  result.valid = true;
  return result;
}
