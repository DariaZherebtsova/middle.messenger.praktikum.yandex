import ProfilePage from './profile';
import insertInDOM from '../../utils/insertInDOM';
import { Input, IInputBlock } from '../../components/input/input';
import Button from '../../components/button/button';
import { validate } from '../../utils/validate/index';
import backBtnImg from '../../../static/img/back-btn.png';
import noImgAvatarLarge from '../../../static/img/noImgAvatar-large.png';

const data = {
  page: {
    backBtnImg,
    noImgAvatarLarge,
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
  buttons: [
    {
      text: 'Изменить данные',
      extraClass: 'btn-change',
      events: {
        click: (event) => changeData(event),
      },
    },
    {
      text: 'Изменить пароль',
      extraClass: 'btn-change',
    },
    {
      text: 'Выйти',
      extraClass: 'btn-exit',
    },
  ],
  submitBtn: {
    text: 'Сохранить',
    events: {
      click: (event) => submit(event),
    },
  },
};

const profilePage = new ProfilePage(data.page);
insertInDOM('#root', profilePage);

const inputs: Input[] = [];
for (let i = 0; i < data.inputs.length; i += 1) {
  const props = {
    wrapperClass: 'profile__input',
    validateRule: data.inputs[i].name,
    ...data.inputs[i],
  };
  const input = new Input(props);
  insertInDOM('.profile__input-box', input);
  input.inputElement.disabled = true;
  inputs.push(input);
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

function changeData(event) {
  console.log('-----changeData', event);
  event.preventDefault();

  // disabled = false
  inputs.forEach(item => {
    item.inputElement.disabled = false;
  });
  // скрыть блок profile__btn-box
  buttons.forEach(item => {
    item.hide();
  });
  // показать profile__submitBtn-box
  submitBtn.show();
}
