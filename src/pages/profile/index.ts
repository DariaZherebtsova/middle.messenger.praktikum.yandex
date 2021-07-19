import ProfilePage from './profile';
import insertInDOM from '../../utils/insertInDOM';
import InputWithLabel from '../../components/inputWithLabel/inputWithLabel';
import { IInputBlock } from '../../components/inputWithLabel/inputWithLabel.type';
import Button from '../../components/button/button';
import { TProps } from '../../components/block/block.type';
import { router } from '../../services/router';
import { userProfileController } from '../../controllers/user-profile';
import { baseUrl } from '../../api/base-api';

const noImgAvatarLarge = 'img/noImgAvatar-large.png';

export async function initProfilePage(rootQuery: string): Promise<ProfilePage> {
  const storeData = await userProfileController.getUserInfo();

  if (storeData === null || storeData === undefined) {
    router.go('/auth');
  }

  const avatarUrl = storeData.avatar ? `${baseUrl}/resources${storeData.avatar}` : noImgAvatarLarge;
  const data = {
    page: {
      avatar: avatarUrl,
    },
    inputs: [
      {
        label: 'Почта',
        name: 'email',
        value: storeData.email,
        type: 'email',
      },
      {
        label: 'Логин',
        name: 'login',
        value: storeData.login,
        type: 'text',
      },
      {
        label: 'Имя',
        name: 'first_name',
        value: storeData.first_name,
        type: 'text',
      },
      {
        label: 'Фамилия',
        name: 'second_name',
        value: storeData.second_name,
        type: 'text',
      },
      {
        label: 'Имя в чате',
        name: 'display_name',
        value: storeData.display_name,
        type: 'text',
      },
      {
        label: 'Телефон',
        name: 'phone',
        value: storeData.phone,
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
    profileForm.addEventListener('keydown', (event: KeyboardEvent) => {
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

  const avatarInput = <HTMLInputElement>document.getElementById('avatar');
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
