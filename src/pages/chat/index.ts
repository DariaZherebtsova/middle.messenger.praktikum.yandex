import Handlebars from 'handlebars';
import insertInDOM from '../../utils/insertInDOM';
import { chatPageTmpl } from './chat.hbs';
import СhatList from '../../modules/chatList/chatList';
import ChatPreview from '../../modules/chatPreview/chatPreview';
import MsgFeed from '../../modules/msgFeed/msgFeed';
import attachBtnImg from '../../../static/img/attach-btn.png';
import sendBtnImg from '../../../static/img/send-btn.png';
import noImgAvatar from '../../../static/img/no_img_circle.svg';

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
    attachBtnImg: `${attachBtnImg}`,
    sendBtnImg: `${sendBtnImg}`,
    noImgAvatar: `${noImgAvatar}`,
    name: 'Илья',
    date: '31 июня',
    msg: 'В траве сидел кузнечик, В траве сидел кузнечик, Совсем как огуречик Зелененький он был.',
  },
};

// render chatPageTmpl
const hbsTemplateFn = Handlebars.compile(chatPageTmpl);
const htmlStr = hbsTemplateFn({});
const root = document.getElementById('root');
if (root) {
  root.innerHTML = htmlStr;
}

// создаем chatList
const chatList = new СhatList({});
insertInDOM('.chat-page-wrapper', chatList);

// создаем сhatPreview
for (let i = 0; i < data.chats.length; i += 1) {
  const сhatPreview = new ChatPreview(data.chats[i]);
  let сhatPreviewLi = document.createElement('li');
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
