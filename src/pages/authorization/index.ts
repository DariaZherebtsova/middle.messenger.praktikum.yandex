import AuthorizationPage from './authorization';
import insertInDOM from '../../utils/insertInDOM';
import Input from '../../components/input/input';
import { IInputBlock } from '../../components/input/inputs.type';
import Button from '../../components/button/button';
import { validate } from '../../utils/validate/index';
import { userAuthController } from '../../controllers/user-auth';
import { router } from '../../services/router';

export function initAuthorizationPage(rootQuery:string): AuthorizationPage {
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
  insertInDOM(rootQuery, authorizationPage);

  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('keydown', (event: Event) => {
      if (event.code === 'Enter') {
        event.preventDefault();
      }
    });
  }

  const inputs: Record<string, IInputBlock> = {};
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
    inputs[data.inputs[i].name] = input;
  }

  const button = new Button(data.button);
  insertInDOM('.login-form__button-box', button);

  function onBlur(event: Event) {
    const inputEl: HTMLElement | null = <HTMLElement>event.target;
    if (inputEl === null) {
      return;
    }
    const inputName = inputEl.getAttribute('name');
    if (inputName === null) {
      return;
    }
    const inputBlock = inputs[inputName];
    const msgEl = inputBlock.getElementForErrorMessage();
    if (msgEl) {
      const resultValidate = validate(inputEl.value, 'required');
      if (!resultValidate.valid) {
        msgEl.textContent = resultValidate.message;
      } else {
        console.log('validate OK');
        msgEl.textContent = '';
      }
    }
  }

  function submit(event: Event) {
    event.preventDefault();
    console.log('----auth submit');
    userAuthController.signin(inputs);
  }

  const loginFormLink = document.getElementsByClassName('login-form__link')[0];
  if (loginFormLink) {
    loginFormLink.addEventListener('click', (event: Event) => {
      console.log('---click');
      event.preventDefault();
      router.go('/registration');
    });
  }

  return authorizationPage;
}
