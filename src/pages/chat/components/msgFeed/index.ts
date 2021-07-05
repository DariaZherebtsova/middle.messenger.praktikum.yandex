import MsgFeed from './msgFeed';
import insertInDOM from '../../../../utils/insertInDOM';
import Input from '../../../../components/input/input';
import Button from '../../../../components/button/button';
import { initModal } from '../modal/index';
import { chatController } from '../../../../controllers/chats';
import ChatTitle from '../chatTitle/chatTitle';
import { initDropdown } from '../dropdown/index';
import WebSocketService from '../../../../services/webSocketService';
import MsgContainer from '../msgContainer/msgContainer';
import { globalStoreEventBus } from '../../../../store/globalStore';

export async function initMsgFeed(parentElSelector:string): Promise<MsgFeed> {
  const data = {
    firstRender: true,
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
    lastMessage: chatController.getLastMessage(),
    msgContainer: {
      wrapperClass: 'msg-feed__msg-container',
      messages: chatController.getMessages(),
    },
    modal_title: 'Добавить пользователя',
  };

  const msgFeed = new MsgFeed(data);
  insertInDOM(parentElSelector, msgFeed);

  if (!data.currentChat) {
    msgFeed.element.classList.add('empty');
    msgFeed.element.textContent = 'Выберите чат чтобы отправить сообщение';
    return msgFeed;
  }
  msgFeed.element.classList.remove('empty');
  msgFeed.props.firstRender = false;

  const params = await chatController.getParamsForWebSoket();
  let webSocketService = new WebSocketService(...params);

  const chatTitle = new ChatTitle(data.currentChat);
  insertInDOM('.msg-feed__header', chatTitle);

  const msgContainer = new MsgContainer(data.msgContainer);
  insertInDOM('.msg-feed__feed', msgContainer);

  // подписываемся на изменение lastMessage
  globalStoreEventBus.on('flow:something-has-changed', doChangeMsgFeed);
  async function doChangeMsgFeed(...args) {
    if (args[0] === 'lastMessage') {
      const msgList = chatController.getMessages();
      msgContainer.props.messages = msgList;
    }
  }

  msgFeed.updateChat = async function updateChat(newCurrentChat) {
    chatTitle.props.title = newCurrentChat.title;
    chatTitle.props.avatar = newCurrentChat.avatar;
    const newParams = await chatController.getParamsForWebSoket();
    webSocketService = new WebSocketService(...newParams);
  };

  const dropdownBox = initDropdown('msg-feed__dropdown-box', data.menuBtns);
  insertInDOM('.msg-feed__header', dropdownBox);

  const openMenuBtn = new Button(data.openMenuBtn);
  insertInDOM('.msg-feed__header', openMenuBtn);

  const modal = initModal('.msg-feed');

  function openMenu(event: Event) {
    event.preventDefault();
    const dropdownEl = document.getElementsByClassName('msg-feed__dropdown-box')[0];
    if (openMenuBtn.props.open) {
      dropdownEl.style.display = 'none';
      openMenuBtn.props.open = false;
    } else {
      dropdownEl.style.display = 'block';
      openMenuBtn.props.open = true;
    }
  }

  function showModal(event: Event) {
    event.preventDefault();
    const dropdownBox = document.getElementsByClassName('msg-feed__dropdown-box')[0];
    dropdownBox.style.display = 'none';
    openMenuBtn.props.open = false;
    modal.show();
  }

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

  function sendMsg() {
    const msg = {
      content: msgInput.element.value,
      type: 'message',
    };
    webSocketService.send(msg);
    msgInput.element.value = '';
  }

  function submit(event: Event) {
    event.preventDefault();
    sendMsg();
  }

  return msgFeed;
}
