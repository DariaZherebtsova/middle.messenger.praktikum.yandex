import insertInDOM from '../../utils/insertInDOM';
import ChatPage from './chat';
import СhatList from './components/chatList/chatList';
import ChatPreview from './components/chatPreview/chatPreview';
import MsgFeed from './components/msgFeed/msgFeed';
import { Input } from '../../components/input/input';
import Button from '../../components/button/button';
import { HTTPrequest } from '../../utils/HTTPrequest';
import noImgAvatar from '../../../static/img/no_img_circle.svg';
import { router } from '../../router/router';

export function initChatPage(rootQuery:string): ChatPage {
  const data = {
    chats: [
      {
        name: 'Илья',
        lastMsg: 'В траве сидел кузнечик ...',
        time: '12:15',
        img: `${noImgAvatar}`,
      },
      {
        name: 'Олег',
        lastMsg: 'Представьте себе, представьте себе Совсем как огуречик...',
        time: 'Пн',
        img: `${noImgAvatar}`,
      },
    ],
    msgFeed: {
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
        type: 'text',
        name: 'message',
      },
      noImgAvatar: `${noImgAvatar}`,
      name: 'Илья',
      date: '31 июня',
      msg: 'В траве сидел кузнечик, В траве сидел кузнечик, Совсем как огуречик Зелененький он был.',
    },
  };

  const chatPage = new ChatPage({});
  insertInDOM(rootQuery, chatPage);

  // // render chatPageTmpl
  // const hbsTemplateFn = Handlebars.compile(chatPageTmpl);
  // const htmlStr = hbsTemplateFn({});
  // const root = document.getElementById('root');
  // if (root) {
  //   root.innerHTML = htmlStr;
  // }

  // создаем chatList
  const chatList = new СhatList({});
  insertInDOM('.chat-page-wrapper', chatList);

  // создаем сhatPreview
  for (let i = 0; i < data.chats.length; i += 1) {
    const сhatPreview = new ChatPreview(data.chats[i]);
    const сhatPreviewLi = document.createElement('li');
    сhatPreviewLi.appendChild(document.createElement('hr'));
    сhatPreviewLi.appendChild(сhatPreview.getWrapperElement());
    const previewList = document.querySelector('.chat-list__preview-list');
    if (previewList) {
      previewList.appendChild(сhatPreviewLi);
    }
  }

  // создаем msgFeed
  const msgFeed = new MsgFeed(data.msgFeed);
  insertInDOM('.chat-page-wrapper', msgFeed);

  const attachBtn = new Button(data.msgFeed.attachBtn);
  attachBtn.getWrapperElement().setAttribute('type', 'button');
  insertInDOM('.msg-feed__send-msg-form', attachBtn);

  const inputBlock = new Input(data.msgFeed.msgInput);
  const input = inputBlock.getElementForEvent();
  input.classList.add('msg-feed__input');
  const box = document.querySelector('.msg-feed__send-msg-form');
  if (box) {
    box.appendChild(input);
  }

  const sendBtn = new Button(data.msgFeed.sendBtn);
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

  const profileLink = document.getElementsByClassName('chat-list__profile-link')[0];
  if (profileLink) {
    profileLink.addEventListener('click', (event: Event) => {
      console.log('---click');
      event.preventDefault();
      router.go('/profile');
    });
  }

  return chatPage;
}
