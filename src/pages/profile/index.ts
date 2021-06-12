import ProfilePage from './profile';
import insertInDOM from '../../utils/insertInDOM';
import { Input } from '../../components/input/input';
import { IInputBlock } from '../../components/input/inputs.type';
import { validateAllInputs } from '../../utils/validate/index';
import Button from '../../components/button/button';
import backBtnImg from '../../../static/img/back-btn.png';
import noImgAvatarLarge from '../../../static/img/noImgAvatar-large.png';

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

const profilePage = new ProfilePage(data.page);
insertInDOM('#root', profilePage);

const profileForm = document.getElementById('profileForm');
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
// const dataInputs: IInputBlock[] = [];
for (let i = 0; i < data.dataInputs.length; i += 1) {
  const props = {
    wrapperClass: 'profile__input',
    validateRule: data.dataInputs[i].name,
    ...data.dataInputs[i],
  };
  const input = new Input(props);
  insertInDOM('.profile__input-box', input);
  input.inputElement.disabled = true;
  inputs.dataInputs.push(input);
}

// const passwordInputs: IInputBlock[] = [];
for (let i = 0; i < data.passwordInputs.length; i += 1) {
  const props = {
    wrapperClass: 'profile__input',
    validateRule: data.passwordInputs[i].name,
    ...data.passwordInputs[i],
  };
  const input = new Input(props);
  insertInDOM('.profile__input-box', input);
  input.hide();
  inputs.passwordInputs.push(input);
}
const btn = `<button class="profile__btn btn-change" onclick="document.location='./profile-change-data.html'">Изменить данные</button>
     <button class="profile__btn btn-change" onclick="document.location='./profile-change-pass.html'">Изменить пароль</button>
     <button class="profile__btn btn-exit" onclick="document.location='./index.html'">Выйти</button>`;

const buttons = [];
for (let i = 0; i < data.buttons.length; i += 1) {
  let props = {
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
  console.log('-----changeData', event);
  event.preventDefault();

  // inputs disabled = false
  inputs.dataInputs.forEach(item => {
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
  console.log('-----onChangePassword', event);
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
  submitBtn.setProps({
    dataset: 'passwordInputs',
  });
  submitBtn.show();
}

function submit(event) {
  event.preventDefault();

  console.log('--submit', event.target);
  console.log('--dataset.inputs', event.target.dataset.inputs);

  if (validateAllInputs(inputs[event.target.dataset.inputs])) {
    // валидация прошла

    // отправляем форму

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
