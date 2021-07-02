import MsgFeed from './msgFeed';
import insertInDOM from '../../../../utils/insertInDOM';
import Input from '../../../../components/input/input';
import Button from '../../../../components/button/button';
import { initModal } from '../modal/index';
import noImgAvatar from '../../../../../static/img/no_img_circle.svg';
import { chatController } from '../../../../controllers/chats';
import ChatTitle from '../chatTitle/chatTitle';
import { initDropdown } from '../dropdown/index';

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
          click: (event: Event) => showModal(event),
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
    currentChat: chatController.getCurrentChat(),
    modal_title: 'Добавить пользователя',
  };

  const msgFeed = new MsgFeed(data);
  insertInDOM(parentElSelector, msgFeed);

  // if (!data.currentChat) {
  //   msgFeed.element.classList.add('empty');
  //   msgFeed.element.textContent = 'Выберите чат чтобы отправить сообщение';
  //   return msgFeed;
  // }
  msgFeed.element.classList.remove('empty');

  // chat title
  // const chatTitleData = {
  //   wrapperClass: 'msg-feed__header',
  //   currentChat: data.currentChat,
  // };
  const chatTitle = new ChatTitle(data.currentChat);
  insertInDOM('.msg-feed__header', chatTitle);

  // dropdown
  const dropdownBox = initDropdown('msg-feed__dropdown-box', data.menuBtns);
  insertInDOM('.msg-feed__header', dropdownBox);

  // msg-feed__header__menu
  const openMenuBtn = new Button(data.openMenuBtn);
  insertInDOM('.msg-feed__header', openMenuBtn);

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

  function showModal(event: Event) {
    console.log('---showModal');
    event.preventDefault();
    const dropdownBox = document.getElementsByClassName('msg-feed__dropdown-box')[0];
    dropdownBox.style.display = 'none';
    openMenuBtn.props.open = false;
    modal.show();
  }

  async function sendMsg() {
    // отправляем форму
    const userId = await chatController.getUserId();
    console.log('---eee userId', userId);
    const token = await chatController.getChatToken('130');
    console.log('---tttoken', token);
    const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/133/${token}`);

    socket.addEventListener('open', () => {
      console.log('Соединение установлено');

      socket.send(JSON.stringify({
        content: 'Моё первое сообщение миру!',
        type: 'message',
      }));
    });

    socket.addEventListener('close', event => {
      if (event.wasClean) {
        console.log('Соединение закрыто чисто');
      } else {
        console.log('Обрыв соединения');
      }

      console.log(`Код: ${event.code} | Причина: ${event.reason}`);
    });

    socket.addEventListener('message', event => {
      console.log('Получены данные', event.data);
    });

    socket.addEventListener('error', event => {
      console.log('Ошибка', event.message);
    });
  }

  function submit(event: Event) {
    event.preventDefault();

    sendMsg();
  }

  return msgFeed;
}
