import {mainTempl} from './authorization.hbs.js';

const chatData = {
  chats: [
    {
      "name": "Илья",
      "lastMsg": "Привет",
      "time": "12:15",
    },
    {
      "name": "Олег",
      "lastMsg": "До скорого",
      "time": "Пн",
    },
  ],
  prefix: "Hello",
}


console.log('--mainTempl--', mainTempl);

var template = Handlebars.compile(mainTempl);

var html = template(chatData);
console.log('html', html);
// console.log('root', document.getElementById('root'));
document.getElementById('root').innerHTML = html;
console.log('end');