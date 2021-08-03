import ProfileEditDataPage from './profileEditData';
import insertInDOM from '../../utils/insertInDOM';
import InputWithLabel from '../../components/inputWithLabel/inputWithLabel';
import { IInputBlock } from '../../components/inputWithLabel/inputWithLabel.type';
import { validate } from '../../utils/validate/index';
import Button from '../../components/button/button';
import { TProps } from '../../components/block/block.type';
import { userProfileController } from '../../controllers/user-profile';
import { router } from '../../services/router';
import { baseUrl } from '../../api/base-api';
import { globalStoreEventBus } from '../../store/globalStore';

const noImgAvatarLarge = 'img/noImgAvatar-large.png';

export async function initProfileEditDataPage(rootQuery: string): Promise<ProfileEditDataPage> {
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
    button: {
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
  };

  const profileEditDataPage = new ProfileEditDataPage(data.page);
  insertInDOM(rootQuery, profileEditDataPage);

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
      router.go('/profile');
    });
  }

  const inputs: Record<string, IInputBlock> = {};
  for (let i = 0; i < data.inputs.length; i += 1) {
    const props: TProps = {
      wrapperClass: 'profile__input',
      validateRule: validateRuleName[data.inputs[i].name],
      ...data.inputs[i],
      events: {
        blur: (event: Event) => onBlur(event),
      },
    };
    const input = new InputWithLabel(props);
    insertInDOM('.profile__input-box', input);
    inputs[data.inputs[i].name] = input;
  }

  const submitBtn = new Button(data.button);
  insertInDOM('.submit-btn-box', submitBtn);

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

  async function submit(event: Event) {
    event.preventDefault();
    await userProfileController.profile(inputs);
  }

  const avatarForm = document.getElementById('profile-avatar');
  const avatarInput = document.getElementById('avatar');
  const avatarImg = avatarForm ? avatarForm.getElementsByClassName('avatar-img')[0] : null;
  if (avatarInput) {
    avatarInput.addEventListener('change', changeAvatar);
    const avatarLabel = document.getElementsByClassName('avatar-label')[0];
    if (avatarLabel) {
      avatarLabel.classList.add('activ');
    }
  }

  async function changeAvatar() {
    const form = new FormData(<HTMLFormElement>avatarForm);
    await userProfileController.profileAvatar(form);
  }

  // подписываемся на изменение avatar
  globalStoreEventBus.on('flow:something-has-changed', doChangeAvatar);
  async function doChangeAvatar(...args: any) {
    if (args[0] === 'avatar') {
      const newAvatar = userProfileController.getAvatar();
      if (avatarImg) {
        avatarImg.setAttribute('src', `${baseUrl}/resources${newAvatar}`);
      }
    }
  }

  return profileEditDataPage;
}
