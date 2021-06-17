import ProfilePage from './profile';
import insertInDOM from '../../utils/insertInDOM';
import { Input } from '../../components/input/input';
import { IInputBlock } from '../../components/input/inputs.type';
import { validate, validateAllInputs } from '../../utils/validate/index';
import Button from '../../components/button/button';
import backBtnImg from '../../../static/img/back-btn.png';
import noImgAvatarLarge from '../../../static/img/noImgAvatar-large.png';
import { TProps } from '../../components/block/block.type';
import { HTTPrequest } from '../../utils/HTTPrequest';

const data = {
  page: {
    backBtnImg,
    noImgAvatarLarge,
  },
  dataInputs: [
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
      label: 'Имя в чате',
      name: 'display_name',
      value: 'Vano',
      type: 'text',
    },
    {
      label: 'Телефон',
      name: 'phone',
      value: '+7 (909) 967 30 30',
      type: 'tel',
    },
  ],
  passwordInputs: [
    {
      label: 'Старый пароль',
      name: 'oldPassword',
      type: 'password',
      value: '1111',
    },
    {
      label: 'Новый пароль',
      name: 'newPassword',
      type: 'password',
      value: '1234',
    },
    {
      label: 'Повторите новый пароль',
      name: 'newPasswordRepeat',
      type: 'password',
      value: '1234',
    },
  ],
  buttons: [
    {
      text: 'Изменить данные',
      extraClass: 'btn-change',
      events: {
        click: (event: Event) => onChangeData(event),
      },
    },
    {
      text: 'Изменить пароль',
      extraClass: 'btn-change',
      events: {
        click: (event: Event) => onChangePassword(event),
      },
    },
    {
      text: 'Выйти',
      extraClass: 'btn-exit',
    },
  ],
  submitBtn: {
    text: 'Сохранить',
    dataset: 'dataInputs',
    events: {
      click: (event: Event) => submit(event),
    },
  },
};

// соответствие правил валидации и имени инпута
const validateRuleName: Record<string, string> = {
  login: 'login',
  password: 'password',
  email: 'email',
  phone: 'phone',
  first_name: 'name',
  second_name: 'name',
  display_name: 'required',
  oldPassword: 'password',
  newPassword: 'password',
  newPasswordRepeat: 'password',
};

const profilePage = new ProfilePage(data.page);
insertInDOM('#root', profilePage);

const profileForm = document.getElementById('profile-form');
if (profileForm) {
  profileForm.addEventListener('keydown', (event: Event) => {
    if (event.code === 'Enter') {
      event.preventDefault();
    }
  });
}

const inputs: Record<string, Record<string, IInputBlock>> = {
  dataInputs: {},
  passwordInputs: {},
};

for (let i = 0; i < data.dataInputs.length; i += 1) {
  const props: TProps = {
    wrapperClass: 'profile__input',
    validateRule: validateRuleName[data.dataInputs[i].name],
    ...data.dataInputs[i],
    events: {
      focus: (event: Event) => {
        console.log('focus on', event.target);
      },
      blur: (event: Event) => onBlur(event),
    },
  };
  const input = new Input(props);
  insertInDOM('.profile__input-box', input);
  input.inputElement.disabled = true;
  inputs.dataInputs[data.dataInputs[i].name] = input;
}
const dataInputs = Object.values(inputs.dataInputs);

for (let i = 0; i < data.passwordInputs.length; i += 1) {
  const props: TProps = {
    wrapperClass: 'profile__input',
    validateRule: validateRuleName[data.passwordInputs[i].name],
    ...data.passwordInputs[i],
    events: {
      focus: (event: Event) => {
        console.log('focus on', event.target);
      },
      blur: (event: Event) => onBlur(event),
    },
  };
  const input = new Input(props);
  insertInDOM('.profile__input-box', input);
  input.hide();
  inputs.passwordInputs[data.passwordInputs[i].name] = input;
}
const passwordInputs = Object.values(inputs.passwordInputs);
const allInputs = {
  ...inputs.dataInputs,
  ...inputs.passwordInputs,
};

const buttons: Button[] = [];
for (let i = 0; i < data.buttons.length; i += 1) {
  const props: TProps = {
    wrapperClass: 'profile__btn',
    ...data.buttons[i],
  };
  const button = new Button(props);
  insertInDOM('.profile__btn-box:not(.submit-btn-box)', button);
  buttons.push(button);
}

const submitBtn = new Button(data.submitBtn);
submitBtn.hide();
insertInDOM('.submit-btn-box', submitBtn);

function onChangeData(event: Event) {
  event.preventDefault();

  // inputs disabled = false
  dataInputs.forEach(item => {
    // eslint-disable-next-line no-param-reassign
    item.inputElement.disabled = false;
  });
  // скрыть блок profile__btn-box
  buttons.forEach(item => {
    item.hide();
  });
  // показать profile__submitBtn-box
  submitBtn.show();
}

function onChangePassword(event: Event) {
  event.preventDefault();

  // скрываем dataInputs
  dataInputs.forEach(item => {
    item.hide();
  });

  // показываем passwordInputs
  passwordInputs.forEach(item => {
    item.show();
  });

  // скрыть блок profile__btn-box
  buttons.forEach(item => {
    item.hide();
  });
  // показать profile__submitBtn-box
  submitBtn.setProps({ dataset: 'passwordInputs' });
  submitBtn.show();
}

function onBlur(event: Event) {
  const inputEl: HTMLElement | null = <HTMLElement>event.target;
  if (inputEl === null) {
    return;
  }
  const inputName = inputEl.getAttribute('name');
  if (inputName === null) {
    return;
  }
  const inputBlock = allInputs[inputName];
  const msgEl = inputBlock.getElementForErrorMessage();
  if (msgEl) {
    const resultValidate = validate(inputEl.value, validateRuleName[inputEl.name]);
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

  const inputEl: HTMLElement | null = <HTMLElement>event.target;
  if (inputEl === null) {
    return;
  }

  const inputsName: string = <string>inputEl.dataset.inputs;
  if (validateAllInputs(Object.values(inputs[inputsName]))) {
    // валидация прошла

    if (inputsName === 'passwordInputs') {
      // сравниваю пароли
      const { newPassword, newPasswordRepeat } = inputs.passwordInputs;
      if (newPassword.inputElement.value !== newPasswordRepeat.inputElement.value) {
        newPassword.getElementForErrorMessage().textContent = 'Пароли не совпадают';
        newPasswordRepeat.getElementForErrorMessage().textContent = 'Пароли не совпадают';
        return;
      }
    }

    // отправляем форму
    const form: HTMLFormElement | null = <HTMLFormElement>document.getElementById('profile-form');
    new HTTPrequest().post('https://chats', { data: new FormData(form) })
      .catch((err) => {
        console.error('profile form submit error', err);
      })
      .finally(() => {
        // возвращаемся в профиль
        if (inputsName === 'dataInputs') {
          dataInputs.forEach(item => {
            // eslint-disable-next-line no-param-reassign
            item.inputElement.disabled = true;
          });
        } else {
          passwordInputs.forEach(item => {
            item.hide();
          });
          dataInputs.forEach(item => {
            item.show();
          });
        }
        // показать блок profile__btn-box
        buttons.forEach(item => {
          item.show();
        });
        // скрыть profile__submitBtn-box
        submitBtn.hide();
      });
  }
}
