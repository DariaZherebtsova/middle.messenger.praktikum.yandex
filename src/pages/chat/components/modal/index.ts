import Modal from './modal';
import insertInDOM from '../../../../utils/insertInDOM';
import InputWithLabel from '../../../../components/inputWithLabel/inputWithLabel';
import Button from '../../../../components/button/button';
import { validate } from '../../../../utils/validate/index';

export function initModal(parentElSelector:string): Modal {
  console.log('--initModal');
  const data = {
    modal_title: 'Добавить пользователя',
    closeBtn: {
      wrapperClass: 'modal__close-button',
      events: {
        click: (event: Event) => close(event),
      },
    },
    button: {
      text: 'Добавить',
      wrapperClass: 'custom-button',
      events: {
        click: (event: Event) => done(event),
      },
    },
    input: {
      label: 'Логин',
      wrapperClass: 'custom-input',
      validateRule: 'login',
      events: {
        blur: (event: Event) => onBlur(event),
      },
    },
  };
  const modal = new Modal(data);
  modal.hide();
  insertInDOM(parentElSelector, modal);

  const closeBtn = new Button(data.closeBtn);
  insertInDOM('.modal__content', closeBtn);

  const input = new InputWithLabel(data.input);
  insertInDOM('.modal__input-box', input);

  const doneBtn = new Button(data.button);
  insertInDOM('.modal__button-box', doneBtn);

  function onBlur(event: Event) {
    const msgEl = input.getElementForErrorMessage();
    if (msgEl) {
      const resultValidate = validate(input.element.value, data.input.validateRule);
      if (!resultValidate.valid) {
        msgEl.textContent = resultValidate.message;
      } else {
        console.log('validate OK');
        msgEl.textContent = '';
      }
    }
  }

  function done() {
    console.log('---done');
  }

  function close() {
    console.log('---done');
    modal.hide();
  }

  return modal;
}
