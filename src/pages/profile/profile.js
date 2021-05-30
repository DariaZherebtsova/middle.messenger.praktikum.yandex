import {profileTempl} from '../../layouts/profile/profile.hbs';
import backBtnImg from '../../../static/img/back-btn.png';
import noImgAvatarLarge from '../../../static/img/noImgAvatar-large.png';

const data = {
  backBtnImg: backBtnImg,
  noImgAvatarLarge: noImgAvatarLarge,
  fields: [
    {
      "label": "Почта",
      "name": "email",
      "value": "pochta@yandex.ru",
    },
    {
      "label": "Логин",
      "name": "login",
      "value": "vano",
    },
    {
      "label": "Имя",
      "name": "name",
      "value": "Иван",
    },
  ]
}

Handlebars.registerHelper("buttons", function() {
  return new Handlebars.SafeString(
    `<button class="profile__btn btn-change">Изменить данные</button>
     <button class="profile__btn btn-change" onclick="document.location='./profile-change-pass.html'">Изменить пароль</button>
     <button class="profile__btn btn-exit">Выйти</button>`);
});

console.log('--profileTempl--', profileTempl);

var template = Handlebars.compile(profileTempl);

var html = template(data);
console.log('html', html);
// console.log('root', document.getElementById('root'));
document.getElementById('root').innerHTML = html;
console.log('end');