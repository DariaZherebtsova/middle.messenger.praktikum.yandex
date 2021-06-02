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
      "type": "email",
    },
    {
      "label": "Логин",
      "name": "login",
      "value": "vano2021",
      "type": "text",
    },
    {
      "label": "Имя",
      "name": "first_name",
      "value": "Иван",
      "type": "text",
    },
    {
      "label": "Фамилия",
      "name": "second_name",
      "value": "Иванов",
      "type": "text",
    },
    {
      "label": "Имя в чате",
      "name": "display_name",
      "value": "Vano",
      "type": "text",
    },
    {
      "label": "Телефон",
      "name": "phone",
      "value": "+7 (909) 967 30 30",
      "type": "phone",
    },
  ]
}

const Handlebars = require("handlebars");
Handlebars.registerHelper("buttons", function() {
  return new Handlebars.SafeString(
    `<button class="profile__btn btn-change" onclick="document.location='./profile-change-data.html'">Изменить данные</button>
     <button class="profile__btn btn-change" onclick="document.location='./profile-change-pass.html'">Изменить пароль</button>
     <button class="profile__btn btn-exit">Выйти</button>`);
});
var template = Handlebars.compile(profileTempl);
var html = template(data);
document.getElementById('root').innerHTML = html;

var inputs = document.getElementsByTagName("input");
for (var i = 0; i < inputs.length; i++) {
  inputs[i].disabled = true;
}