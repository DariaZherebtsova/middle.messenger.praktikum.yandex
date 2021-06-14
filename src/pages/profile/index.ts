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
      type: 'phone',
    },
  ],
  passwordInputs: [
    {
      label: 'Старый пароль',
      name: 'oldPassword',
      type: 'password',
      value: '111',
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
        click: (event) => onChangeData(event),
      },
    },
    {
      text: 'Изменить пароль',
      extraClass: 'btn-change',
      events: {
        click: (event) => onChangePassword(event),
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
      click: (event) => submit(event),
    },
  },
};

// соответствие правил валидации и имени инпута
const validateRuleName = {
  login: 'login',
  password: 'password',
  email: 'email',
  phone: 'phone',
  first_name: 'name',
  second_name: 'name',
  oldPassword: 'password',
  newPassword: 'password',
  newPasswordRepeat: 'password',
};

const profilePage = new ProfilePage(data.page);
insertInDOM('#root', profilePage);

const profileForm = document.getElementById('profile-form');
if (profileForm) {
  profileForm.addEventListener('keydown', (event) => {
    if (event.code === 'Enter') {
      event.preventDefault();
    }
  });
}

const inputs: {
  dataInputs: IInputBlock[],
  passwordInputs: IInputBlock[],
} = {
  dataInputs: [],
  passwordInputs: [],
};

for (let i = 0; i < data.dataInputs.length; i += 1) {
  const props: TProps = {
    wrapperClass: 'profile__input',
    validateRule: validateRuleName[data.dataInputs[i].name],
    ...data.dataInputs[i],
    events: {
      focus: (event) => {
        console.log('focus on', event.target);
      },
      blur: (event) => onBlur(event),
    },
  };
  const input = new Input(props);
  insertInDOM('.profile__input-box', input);
  input.inputElement.disabled = true;
  inputs.dataInputs.push(input);
}

for (let i = 0; i < data.passwordInputs.length; i += 1) {
  const props: TProps = {
    wrapperClass: 'profile__input',
    validateRule: data.passwordInputs[i].name,
    ...data.passwordInputs[i],
    events: {
      focus: (event) => {
        console.log('focus on', event.target);
      },
      blur: (event) => onBlur(event),
    },
  };
  const input = new Input(props);
  insertInDOM('.profile__input-box', input);
  input.hide();
  inputs.passwordInputs.push(input);
}

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

function onChangeData(event) {
  event.preventDefault();

  // inputs disabled = false
  inputs.dataInputs.forEach(item => {
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

function onChangePassword(event) {
  event.preventDefault();

  // скрываем dataInputs
  inputs.dataInputs.forEach(item => {
    item.hide();
  });

  // показываем passwordInputs
  inputs.passwordInputs.forEach(item => {
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

function onBlur(event) {
  const resultValidate = validate(event.target.value, validateRuleName[event.target.name]);

  if (!resultValidate.valid) {
    // eslint-disable-next-line no-param-reassign
    event.target.parentElement.parentElement.querySelector('.error-message').textContent = resultValidate.message;
  } else {
    console.log('validate OK');
    // eslint-disable-next-line no-param-reassign
    event.target.parentElement.parentElement.querySelector('.error-message').textContent = '';
  }
}

function submit(event) {
  event.preventDefault();

  if (validateAllInputs(inputs[event.target.dataset.inputs])) {
    // валидация прошла

    // отправляем форму
    const form: HTMLFormElement | null = <HTMLFormElement>document.getElementById('profile-form');
    new HTTPrequest().post('https://chats', { data: new FormData(form) });

    // возвращаемся в профиль
    setTimeout(() => {
      if (event.target.dataset.inputs === 'dataInputs') {
        inputs.dataInputs.forEach(item => {
          // eslint-disable-next-line no-param-reassign
          item.inputElement.disabled = true;
        });
      } else {
        inputs.passwordInputs.forEach(item => {
          item.hide();
        });
        inputs.dataInputs.forEach(item => {
          item.show();
        });
      }
      // показать блок profile__btn-box
      buttons.forEach(item => {
        item.show();
      });
      // скрыть profile__submitBtn-box
      submitBtn.hide();
    }, 500);
  }
}
