import ProfileEditDataPage from './profileEditData';
import insertInDOM from '../../utils/insertInDOM';
import InputWithLabel from '../../components/inputWithLabel/inputWithLabel';
import { IInputBlock } from '../../components/inputWithLabel/inputWithLabel.type';
import { validate } from '../../utils/validate/index';
import Button from '../../components/button/button';
import noImgAvatarLarge from '../../../static/img/noImgAvatar-large.png';
import { TProps } from '../../components/block/block.type';
import { userProfileController } from '../../controllers/user-profile';
import { router } from '../../services/router';

export function initProfileEditDataPage(rootQuery: string): ProfilePage {
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
    profileForm.addEventListener('keydown', (event: Event) => {
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
        focus: (event: Event) => {
          console.log('focus on', event.target);
        },
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
    const inputEl: HTMLElement | null = <HTMLElement>event.target;
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
        console.log('validate OK');
        msgEl.textContent = '';
      }
    }
  }

  function submit(event: Event) {
    event.preventDefault();
    console.log('----edit data submit');
    userProfileController.profile(inputs);
  }

  const avatarForm = document.getElementById('profile-avatar');
  const avatarInput = document.getElementById('avatar');
  if (avatarInput) {
    avatarInput.addEventListener('change', event => {
      if (avatarForm) {
        const form = new FormData(<HTMLFormElement>avatarForm);
        userProfileController.profileAvatar(form);
      }
    });
    const avatarLabel = document.getElementsByClassName('avatar-label')[0];
    if (avatarLabel) {
      avatarLabel.classList.add('activ');
    }
  }
  return profileEditDataPage;
}
