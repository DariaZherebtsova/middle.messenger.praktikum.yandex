import RegistrationPage from './registration';
import insertInDOM from '../../utils/insertInDOM';
import InputWithLabel from '../../components/inputWithLabel/inputWithLabel';
import { IInputBlock } from '../../components/inputWithLabel/inputWithLabel.type';
import Button from '../../components/button/button';
import { validate } from '../../utils/validate/index';
import { userRegistrationController } from '../../controllers/user-registration';
import { router } from '../../services/router';

export function initRegistrationPage(rootQuery:string): RegistrationPage {
  const data = {
    page: {
      header: 'Регистрация',
      link: './authorization.html',
      linkText: 'Войти',

    },
    inputs: [
      {
        label: 'Почта',
        name: 'email',
        value: 'pochta@yandex.ru',
        type: 'email',
      },
      {
        label: 'Логин',
        name: 'login',
        value: 'vano2021',
        type: 'text',
      },
      {
        label: 'Имя',
        name: 'first_name',
        value: 'Иван',
        type: 'text',
      },
      {
        label: 'Фамилия',
        name: 'second_name',
        value: 'Иванов',
        type: 'text',
      },
      {
        label: 'Телефон',
        name: 'phone',
        value: '+7 (909) 999 99 99',
        type: 'tel',
      },
      {
        label: 'Пароль',
        name: 'password',
        type: 'password',
        value: '',
      },
      {
        label: 'Пароль (ещё раз)',
        name: 'passwordRepeat',
        type: 'password',
        value: '',
      },
    ],
    button: {
      text: 'Зарегистрироваться',
      events: {
        click: (event: Event) => submit(event),
      },
    },
  };

  // соответствие правил валидации и имени инпута
  const validateRuleName: Record<string, string> = {
    login: 'login',
    email: 'email',
    phone: 'phone',
    first_name: 'name',
    second_name: 'name',
    password: 'password',
    passwordRepeat: 'password',
  };

  const registrationPage = new RegistrationPage(data.page);
  insertInDOM(rootQuery, registrationPage);

  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.code === 'Enter') {
        event.preventDefault();
      }
    });
  }

  const inputs: Record<string, IInputBlock> = {};
  for (let i = 0; i < data.inputs.length; i += 1) {
    const props = {
      wrapperClass: 'custom-input',
      validateRule: validateRuleName[data.inputs[i].name],
      ...data.inputs[i],
      events: {
        blur: (event: Event) => onBlur(event),
      },
    };
    const input: IInputBlock = new InputWithLabel(props);
    insertInDOM('.login-form__input-box', input);
    inputs[data.inputs[i].name] = input;
  }

  const button = new Button(data.button);
  insertInDOM('.login-form__button-box', button);

  function onBlur(event: Event) {
    const inputEl: HTMLInputElement | null = <HTMLInputElement>event.target;
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
      const resultValidate = validate(inputEl.value, validateRuleName[inputEl.name]);
      if (!resultValidate.valid) {
        msgEl.textContent = resultValidate.message;
      } else {
        msgEl.textContent = '';
      }
    }
  }

  function submit(event: Event) {
    event.preventDefault();
    userRegistrationController.signup(inputs);
  }

  const loginFormLink = document.getElementsByClassName('login-form__link')[0];
  if (loginFormLink) {
    loginFormLink.addEventListener('click', (event: Event) => {
      event.preventDefault();
      router.go('/auth');
    });
  }

  return registrationPage;
}
