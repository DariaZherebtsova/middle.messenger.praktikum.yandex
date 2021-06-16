import AuthorizationPage from './authorization';
import insertInDOM from '../../utils/insertInDOM';
import { Input } from '../../components/input/input';
import { IInputBlock } from '../../components/input/inputs.type';
import Button from '../../components/button/button';
import { validate, validateAllInputs } from '../../utils/validate/index';
import { HTTPrequest } from '../../utils/HTTPrequest';

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
      click: (event: Event) => submit(event),
    },
  },
};

const authorizationPage = new AuthorizationPage(data.page);
insertInDOM('#root', authorizationPage);

const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('keydown', (event: Event) => {
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
      focus: (event: Event) => {
        console.log('focus on', event.target);
      },
      blur: (event: Event) => onBlur(event),
    },
  };
  const input: Input = new Input(props);
  insertInDOM('.login-form__input-box', input);
  inputs.push(input);
}

const button = new Button(data.button);
insertInDOM('.login-form__button-box', button);

function onBlur(event: Event) {
  const inputEl: HTMLElement | null = <HTMLElement>event.target;
  if (inputEl === null) {
    return;
  }
  const resultValidate = validate(inputEl.value, 'required');

  if (!resultValidate.valid) {
    // eslint-disable-next-line no-param-reassign
    inputEl.value.parentElement.parentElement.querySelector('.error-message').textContent = resultValidate.message;
  } else {
    console.log('validate OK');
    // eslint-disable-next-line no-param-reassign
    inputEl.value.parentElement.parentElement.querySelector('.error-message').textContent = '';
  }
}

function submit(event: Event) {
  event.preventDefault();

  if (validateAllInputs(inputs)) {
    // валидация прошла

    // отправляем форму
    const form: HTMLFormElement | null = <HTMLFormElement>document.getElementById('loginForm');
    new HTTPrequest().post('https://chats', { data: new FormData(form) })
      .catch((err) => {
        console.error('loginForm submit error', err);
      });
  }
}
