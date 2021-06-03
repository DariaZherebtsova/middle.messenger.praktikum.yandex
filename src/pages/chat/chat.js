import Handlebars from 'handlebars';
import {mainTempl} from './chat.hbs.js';
import {chatList} from '../../modules/chatList/chatList.hbs.js';
import {chatPreview} from '../../modules/chatPreview/chatPreview.hbs.js';
import {msgFeed} from '../../modules/msgFeed/msgFeed.hbs.js';
import attachBtnImg from '../../../static/img/attach-btn.png';
import sendBtnImg from '../../../static/img/send-btn.png';
import noImgAvatar from '../../../static/img/no_img_circle.svg';

const chatData = {
  chats: [
    {
      'name': 'Илья',
      'lastMsg': 'В траве сидел кузнечик ...',
      'time': '12:15',
      'img': `${noImgAvatar}`
    },
    {
      'name': 'Олег',
      'lastMsg': 'Представьте себе, представьте себе Совсем как огуречик...',
      'time': 'Пн',
      'img': `${noImgAvatar}`
    },
  ],
  msgFeedData: {
    test: 'testtt',
    attachBtnImg: `${attachBtnImg}`,
    sendBtnImg: `${sendBtnImg}`,
    noImgAvatar: `${noImgAvatar}`,
    name: 'Илья',
    date: '31 июня',
    msg: 'В траве сидел кузнечик, В траве сидел кузнечик, Совсем как огуречик Зелененький он был.',
  },
}

Handlebars.registerPartial('chatList', chatList);
Handlebars.registerPartial('chatPreview', chatPreview);
Handlebars.registerPartial('msgFeed', msgFeed);
const template = Handlebars.compile(mainTempl);
const html = template(chatData);
document.getElementById('root').innerHTML = html;
