import Modal from './modal';
import insertInDOM from '../../../../utils/insertInDOM';
import InputWithLabel from '../../../../components/inputWithLabel/inputWithLabel';
import Button from '../../../../components/button/button';
import { validate } from '../../../../utils/validate/index';
import { chatController } from '../../../../controllers/chats';

export function initModal(parentElSelector:string): Modal {
  const data = {
    modal_title: 'Добавить пользователя',
    closeBtn: {
      wrapperClass: 'modal__close-button',
      events: {
        click: () => close(),
      },
    },
    button: {
      text: 'Добавить',
      wrapperClass: 'custom-button',
      events: {
        click: () => done(),
      },
    },
    input: {
      label: 'id',
      wrapperClass: 'custom-input',
      validateRule: 'number',
      events: {
        blur: () => onBlur(),
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

  function onBlur() {
    const msgEl = input.getElementForErrorMessage();
    if (msgEl) {
      const inputEl: HTMLInputElement = <HTMLInputElement>input.element;
      const resultValidate = validate(inputEl.value, data.input.validateRule);
      if (!resultValidate.valid) {
        msgEl.textContent = resultValidate.message;
      } else {
        msgEl.textContent = '';
      }
    }
  }

  function done() {
    chatController.addUsers(input.inputElement.value);
    input.inputElement.value = '';
    modal.hide();
  }

  function close() {
    input.inputElement.value = '';
    modal.hide();
  }

  return modal;
}
