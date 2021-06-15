import RegistrationPage from './registration';
import insertInDOM from '../../utils/insertInDOM';
import { Input } from '../../components/input/input';
import { IInputBlock } from '../../components/input/inputs.type';
import Button from '../../components/button/button';
import { validate, validateAllInputs } from '../../utils/validate/index';
import { HTTPrequest } from '../../utils/HTTPrequest';

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
      value: '1234',
    },
    {
      label: 'Пароль (ещё раз)',
      name: 'passwordRepeat',
      type: 'password',
      value: '1234',
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
insertInDOM('#root', registrationPage);

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
    validateRule: validateRuleName[data.inputs[i].name],
    ...data.inputs[i],
    events: {
      focus: (event: Event) => {
        console.log('focus on', event.target);
      },
      blur: (event: Event) => onBlur(event),
    },
  };
  const input: IInputBlock = new Input(props);
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
  const resultValidate = validate(inputEl.value, validateRuleName[inputEl.name]);

  if (!resultValidate.valid) {
    // eslint-disable-next-line no-param-reassign
    inputEl.parentElement.parentElement.querySelector('.error-message').textContent = resultValidate.message;
  } else {
    console.log('validate OK');
    // eslint-disable-next-line no-param-reassign
    inputEl.parentElement.parentElement.querySelector('.error-message').textContent = '';
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
        console.error('registration form submit error', err);
      });
  }
}
