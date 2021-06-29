import ProfilePage from './profile';
import insertInDOM from '../../utils/insertInDOM';
import InputWithLabel from '../../components/inputWithLabel/inputWithLabel';
import { IInputBlock } from '../../components/inputWithLabel/inputWithLabel.type';
import Button from '../../components/button/button';
import noImgAvatarLarge from '../../../static/img/ava.JPG';
import { TProps } from '../../components/block/block.type';
import { router } from '../../services/router';

export function initProfilePage(rootQuery: string): ProfilePage {
  const data = {
    page: {
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
        type: 'tel',
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
        events: {
          click: (event: Event) => exit(event),
        },
      },
    ],
  };

  const profilePage = new ProfilePage(data.page);
  insertInDOM(rootQuery, profilePage);

  const profileForm = document.getElementById('profile-form');
  if (profileForm) {
    profileForm.addEventListener('keydown', (event: Event) => {
      if (event.code === 'Enter') {
        event.preventDefault();
      }
    });
  }

  const btnBack = document.getElementsByClassName('profile__back-btn')[0];
  if (btnBack) {
    btnBack.addEventListener('click', () => {
      router.go('/');
    });
  }

  const inputs: Record<string, IInputBlock> = {};
  for (let i = 0; i < data.inputs.length; i += 1) {
    const props: TProps = {
      wrapperClass: 'profile__input',
      ...data.inputs[i],
    };
    const input = new InputWithLabel(props);
    insertInDOM('.profile__input-box', input);
    input.inputElement.disabled = true;
    inputs[data.inputs[i].name] = input;
  }

  const avatarInput = document.getElementById('avatar');
  if (avatarInput) {
    avatarInput.disabled = true;
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

  function onChangeData(event: Event): void {
    event.preventDefault();
    router.go('/profile/edit-data');
  }

  function onChangePassword(event: Event) {
    event.preventDefault();
    router.go('/profile/edit-password');
  }

  function exit(event: Event) {
    event.preventDefault();
    router.go('/');
  }

  return profilePage;
}
