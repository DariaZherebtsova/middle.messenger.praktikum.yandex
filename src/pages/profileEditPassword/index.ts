import ProfileEditPasswordPage from './profileEditPassword';
import insertInDOM from '../../utils/insertInDOM';
import InputWithLabel from '../../components/inputWithLabel/inputWithLabel';
import { IInputBlock } from '../../components/inputWithLabel/inputWithLabel.type';
import { validate } from '../../utils/validate/index';
import Button from '../../components/button/button';
// import noImgAvatarLarge from '../../../static/img/noImgAvatar-large.png';
import { TProps } from '../../components/block/block.type';
import { userProfileController } from '../../controllers/user-profile';
import { router } from '../../services/router';
import { baseUrl } from '../../api/base-api';

const noImgAvatarLarge = 'img/noImgAvatar-large.png';

// eslint-disable-next-line max-len
export async function initProfileEditPasswordPage(rootQuery: string): Promise<ProfileEditPasswordPage> {
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
        label: 'Старый пароль',
        name: 'oldPassword',
        type: 'password',
        value: '',
      },
      {
        label: 'Новый пароль',
        name: 'newPassword',
        type: 'password',
        value: '',
      },
      {
        label: 'Повторите новый пароль',
        name: 'newPasswordRepeat',
        type: 'password',
        value: '',
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

  const profileEditPasswordPage = new ProfileEditPasswordPage(data.page);
  insertInDOM(rootQuery, profileEditPasswordPage);

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
      validateRule: 'password',
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
      const resultValidate = validate(inputEl.value, 'password');
      if (!resultValidate.valid) {
        msgEl.textContent = resultValidate.message;
      } else {
        msgEl.textContent = '';
      }
    }
  }

  async function submit(event: Event) {
    event.preventDefault();
    const result = await userProfileController.password(inputs);
    if (result === 'Password is incorrect') {
      const msgEl = inputs.oldPassword.getElementForErrorMessage();
      if (msgEl) {
        msgEl.textContent = 'Неверный пароль';
      }
    }
  }

  return profileEditPasswordPage;
}
