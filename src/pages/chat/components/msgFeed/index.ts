import MsgFeed from './msgFeed';
import insertInDOM from '../../../../utils/insertInDOM';
import Input from '../../../../components/input/input';
import Button from '../../../../components/button/button';
import { initModal } from '../modal/index';
import noImgAvatar from '../../../../../static/img/no_img_circle.svg';

export function initMsgFeed(parentElSelector:string): MsgFeed {
  const data = {
    openMenuBtn: {
      wrapperClass: 'msg-feed__header__menu-btn',
      open: false,
      events: {
        click: (event: Event) => openMenu(event),
      },
    },
    menuBtns: [
      {
        wrapperClass: 'msg-feed__add-user-btn',
        text: 'Добавить пользователя',
        events: {
          click: (event: Event) => addUser(event),
        },
      },
      {
        wrapperClass: 'msg-feed__delete-user-btn',
        text: 'Удалить пользователя',
        events: {
          click: (event: Event) => openMenu(event),
        },
      },
    ],
    attachBtn: {
      wrapperClass: 'msg-feed__attach-btn',
    },
    sendBtn: {
      wrapperClass: 'msg-feed__send-btn',
      events: {
        click: (event: Event) => submit(event),
      },
    },
    msgInput: {
      wrapperClass: 'msg-feed__input',
    },
    modal_title: 'Добавить пользователя',
    avatar: `${noImgAvatar}`,
    title: 'Илья',
    date: '31 июня',
    last_message: 'В траве сидел кузнечик, В траве сидел кузнечик, Совсем как огуречик Зелененький он был.',
  };

  const msgFeed = new MsgFeed(data);
  insertInDOM(parentElSelector, msgFeed);

  // msg-feed__header__menu
  const openMenuBtn = new Button(data.openMenuBtn);
  insertInDOM('.msg-feed__header', openMenuBtn);

  for (let i = 0; i < data.menuBtns.length; i += 1) {
    const menuBtn = new Button(data.menuBtns[i]);
    const menuBtnLi = document.createElement('li');
    menuBtnLi.appendChild(menuBtn.element);
    const dropdown = document.querySelector('.msg-feed__dropdown');
    if (dropdown) {
      dropdown.appendChild(menuBtnLi);
    }
  }

  const modal = initModal('.msg-feed');

  const attachBtn = new Button(data.attachBtn);
  attachBtn.getWrapperElement().setAttribute('type', 'button');
  insertInDOM('.msg-feed__send-msg-form', attachBtn);

  const msgInput = new Input(data.msgInput);
  msgInput.element.setAttribute('name', 'message');
  insertInDOM('.msg-feed__send-msg-form', msgInput);

  const sendBtn = new Button(data.sendBtn);
  attachBtn.getWrapperElement().setAttribute('type', 'submit');
  insertInDOM('.msg-feed__send-msg-form', sendBtn);

  const sendMsgForm: HTMLFormElement | null = <HTMLFormElement>document.getElementById('send-msg-form');
  if (sendMsgForm) {
    sendMsgForm.addEventListener('keydown', (event: Event) => {
      if (event.code === 'Enter') {
        event.preventDefault();

        sendMsg();
      }
    });
  }

  function openMenu(event: Event) {
    console.log('---openMenu');
    event.preventDefault();
    const dropdownBox = document.getElementsByClassName('msg-feed__dropdown-box')[0];
    if (openMenuBtn.props.open) {
      dropdownBox.style.display = 'none';
      openMenuBtn.props.open = false;
    } else {
      dropdownBox.style.display = 'block';
      openMenuBtn.props.open = true;
    }
  }

  function addUser(event: Event) {
    console.log('---addUser');
    event.preventDefault();
    const dropdownBox = document.getElementsByClassName('msg-feed__dropdown-box')[0];
    dropdownBox.style.display = 'none';
    openMenuBtn.props.open = false;
    modal.show();
  }

  function sendMsg() {
    // отправляем форму
    new HTTPrequest().post('https://chats', { data: new FormData(<HTMLFormElement>sendMsgForm) })
      .catch((err) => {
        console.error('sendMsg error', err);
      });
  }

  function submit(event: Event) {
    event.preventDefault();

    sendMsg();
  }

  return msgFeed;
}
