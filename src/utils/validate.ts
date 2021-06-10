
export function validate(value, type) {
  console.log('------validate value', value);
  console.log('------validate type', type);

  
  const validateRule  = {
    login: validateLogin,
    password: validatePassword,
    email: validateEmail,

  };

  return validateRule[type](value);
}

function validateLogin(login){
  let result = {
    valid: false,
    message: ''
  }

  if(login.length < 4 || login.length > 20) {
    result.message = 'В логине должено быть от 4 до 20 символов';
    return result;
  }

  if(/^[a-zA-Z0-9]+$/.test(login) === false) {
    result.message = 'В логине должны быть только латинские буквы и цифры';
    return result;
  }

  if(/[a-zA-Z]/.test(login.substr(0, 1)) === false) {
    result.message = 'Логин должен начинаться с буквы';
    return result;
  }

  result.valid = true;
  return result;
}

function validatePassword(password) {
  let result = {
    valid: false,
    message: ''
  }

  if(!password.length) {
    result.message = 'Введите пароль';
    return result;
  }
  
  result.valid = true;
  return result;
}

function validateEmail(email) {
  let result = {
    valid: false,
    message: ''
  }
  const emailRegex = /(^$|^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/;
  console.log(emailRegex.test(email));
  if (!emailRegex.test(email)) {
    result.message = 'Не корректный email';
    return result;
  }

  result.valid = true;
  return result;
}

