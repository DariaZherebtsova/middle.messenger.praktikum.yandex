import AuthorizationPage from './authorization';
import insertInDOM from '../../utils/insertInDOM';
import { Input } from '../../components/input/input';
import { IInputBlock } from '../../components/input/inputs.type';
import Button from '../../components/button/button';
import { validate, validateAllInputs } from '../../utils/validate/index';

const data = {
  page: {
    header: 'Вход',
    link: './registration.html',
    linkText: 'Нет аккаунта?',
  },
  inputs: [
    {
      label: 'Логин',
      name: 'login',
      type: 'text',
      value: 'vano2022',
    },
    {
      label: 'Пароль',
      name: 'password',
      type: 'password',
      value: '12345',
    },
  ],
  button: {
    text: 'Авторизация',
    events: {
      click: (event) => submit(event),
    },
  },
};

const authorizationPage = new AuthorizationPage(data.page);
insertInDOM('#root', authorizationPage);

const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('keydown', (event) => {
    if (event.code === 'Enter') {
      event.preventDefault();
    }
  });
}

const inputs: IInputBlock[] = [];
for (let i = 0; i < data.inputs.length; i += 1) {
  const props = {
    wrapperClass: 'custom-input',
    validateRule: 'required',
    ...data.inputs[i],
    events: {
      focus: (event) => {
        console.log('focus on', event.target);
      },
      blur: (event) => onBlur(event),
    },
  };
  const input: Input = new Input(props);
  insertInDOM('.login-form__input-box', input);
  inputs.push(input);
}

const button = new Button(data.button);
insertInDOM('.login-form__button-box', button);

function submit(event) {
  event.preventDefault();

  validateAllInputs(inputs);
}

function onBlur(event) {
  const resultValidate = validate(event.target.value, 'required');

  if (!resultValidate.valid) {
    // eslint-disable-next-line no-param-reassign
    event.target.parentElement.parentElement.querySelector('.error-message').textContent = resultValidate.message;
  } else {
    console.log('validate OK');
    // eslint-disable-next-line no-param-reassign
    event.target.parentElement.parentElement.querySelector('.error-message').textContent = '';
  }
}
