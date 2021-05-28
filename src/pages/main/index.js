import '../../../js/handlebars-v4.7.7';
import {mainTempl} from './index.hbs.js';
import {chatList} from '../../modules/chatList/chatList.hbs.js';
import {chatPreview} from '../../modules/chatPreview/chatPreview.hbs.js';
import testImg from '../../../static/img/no_img_circle.svg';

const chatData = {
  chats: [
    {
      "name": "Илья",
      "lastMsg": "Привет",
      "time": "12:15",
      "img": `${testImg}`
    },
    {
      "name": "Олег",
      "lastMsg": "До скорого",
      "time": "Пн",
      "img": `${testImg}`
    },
  ],
  prefix: "Hello",
}


console.log('--testImg--', testImg);

Handlebars.registerPartial("chatList", chatList);
Handlebars.registerPartial("chatPreview", chatPreview);

var template = Handlebars.compile(mainTempl);

var html = template(chatData);
console.log('html', html);
// console.log('root', document.getElementById('root'));
document.getElementById('root').innerHTML = html;
console.log('end');