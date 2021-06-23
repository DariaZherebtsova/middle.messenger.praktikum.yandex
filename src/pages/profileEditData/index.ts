import ProfileEditDataPage from './profileEditData';
import insertInDOM from '../../utils/insertInDOM';
import { Input } from '../../components/input/input';
import { IInputBlock } from '../../components/input/inputs.type';
import { validate, validateAllInputs } from '../../utils/validate/index';
import Button from '../../components/button/button';
import backBtnImg from '../../../static/img/back-btn.png';
import noImgAvatarLarge from '../../../static/img/noImgAvatar-large.png';
import { TProps } from '../../components/block/block.type';
import { HTTPrequest } from '../../utils/HTTPrequest';
import { router } from '../../router/router';

export function initProfileEditDataPage(rootQuery: string): ProfilePage {
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

  return profileEditDataPage;
}
