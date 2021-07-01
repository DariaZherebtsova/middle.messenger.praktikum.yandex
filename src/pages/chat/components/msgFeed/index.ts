import MsgFeed from './msgFeed';
import insertInDOM from '../../../../utils/insertInDOM';
import Input from '../../../../components/input/input';
import Button from '../../../../components/button/button';
import noImgAvatar from '../../../../../static/img/no_img_circle.svg';

export function initMsgFeed(parentElSelector:string): MsgFeed {
  const data = {
    menuBtn: {
      wrapperClass: 'msg-feed__header__menu-btn',
    },
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
    avatar: `${noImgAvatar}`,
    title: 'Илья',
    date: '31 июня',
    last_message: 'В траве сидел кузнечик, В траве сидел кузнечик, Совсем как огуречик Зелененький он был.',
  };

  const msgFeed = new MsgFeed(data);
  insertInDOM(parentElSelector, msgFeed);

  // msg-feed__header__menu
  const menuBtn = new Button(data.menuBtn);
  insertInDOM('.msg-feed__header', menuBtn);

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
