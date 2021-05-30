import {profileTempl} from '../../layouts/profile/profile.hbs';
import backBtnImg from '../../../static/img/back-btn.png';
import noImgAvatarLarge from '../../../static/img/noImgAvatar-large.png';

const data = {
  backBtnImg: backBtnImg,
  noImgAvatarLarge: noImgAvatarLarge,
  fields: [
    {
      "label": "Старый пароль",
      "name": "oldPassword",
      "type": "password",
      "value": "111",
    },
    {
      "label": "Новый парол",
      "name": "newPassword",
      "type": "password",
      "value": "1234",
    },
    {
      "label": "Повторите новый пароль",
      "name": "newPasswordRepeat",
      "type": "password",
      "value": "1234",
    },
  ]
}

Handlebars.registerHelper("buttons", function() {
  return new Handlebars.SafeString('<button class="custom-button" type="submit">Сохранить</button>');
});

console.log('--profileTempl--', profileTempl);

var template = Handlebars.compile(profileTempl);

var html = template(data);
console.log('html', html);
// console.log('root', document.getElementById('root'));
document.getElementById('root').innerHTML = html;
console.log('end');