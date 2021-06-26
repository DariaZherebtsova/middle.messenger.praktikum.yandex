import ProfileEditPasswordPage from './profileEditPassword';
import insertInDOM from '../../utils/insertInDOM';
import { Input } from '../../components/input/input';
import { IInputBlock } from '../../components/input/inputs.type';
import { validate, validateAllInputs } from '../../utils/validate/index';
import Button from '../../components/button/button';
import noImgAvatarLarge from '../../../static/img/noImgAvatar-large.png';
import { TProps } from '../../components/block/block.type';
import { HTTPrequest } from '../../utils/HTTPrequest';
import { router } from '../../router/router';

export function initProfileEditPasswordPage(rootQuery: string): ProfileEditPasswordPage {
  const data = {
    page: {
      noImgAvatarLarge,
    },
    inputs: [
      {
        label: 'Старый пароль',
        name: 'oldPassword',
        type: 'password',
        value: '11111111',
      },
      {
        label: 'Новый пароль',
        name: 'newPassword',
        type: 'password',
        value: '12344321',
      },
      {
        label: 'Повторите новый пароль',
        name: 'newPasswordRepeat',
        type: 'password',
        value: '12344321',
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
      validateRule: 'password',
      ...data.inputs[i],
      events: {
        focus: (event: Event) => {
          console.log('focus on', event.target);
        },
        blur: (event: Event) => onBlur(event),
      },
    };
    const input = new Input(props);
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
      const resultValidate = validate(inputEl.value, 'password');
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

    if (validateAllInputs(Object.values(inputs))) {
      // валидация прошла

      // отправляем форму
      const form: HTMLFormElement | null = <HTMLFormElement>document.getElementById('profile-form');
      new HTTPrequest().post('https://chats', { data: new FormData(form) })
        .catch((err) => {
          console.error('profile form submit error', err);
        })
        .finally(() => {
          // возвращаемся в профиль
          router.go('/profile');
        });
    }
  }

  return profileEditPasswordPage;
}
