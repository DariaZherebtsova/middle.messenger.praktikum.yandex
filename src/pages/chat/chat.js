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
      "name": "Илья",
      "lastMsg": "Слова - это капкан. Если ты неверно понял собеседника,то ...",
      "time": "12:15",
      "img": `${noImgAvatar}`
    },
    {
      "name": "Олег",
      "lastMsg": "Если заблудишься в лабиринте - бей зеркала. Выходи на свет...",
      "time": "Пн",
      "img": `${noImgAvatar}`
    },
  ],
  msgFeedData: {
    test: 'testtt',
    attachBtnImg: `${attachBtnImg}`,
    sendBtnImg: `${sendBtnImg}`,
    noImgAvatar: `${noImgAvatar}`
  },
}


console.log('--sendBtnImg--', sendBtnImg);

Handlebars.registerPartial("chatList", chatList);
Handlebars.registerPartial("chatPreview", chatPreview);
Handlebars.registerPartial("msgFeed", msgFeed);

var template = Handlebars.compile(mainTempl);

var html = template(chatData);
console.log('html', html);
document.getElementById('root').innerHTML = html;
console.log('end');