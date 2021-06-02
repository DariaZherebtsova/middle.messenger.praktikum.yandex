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
      "label": "Новый пароль",
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

const Handlebars = require("handlebars");
Handlebars.registerHelper("submitButton", function() {
  return new Handlebars.SafeString('<button class="custom-button" type="submit">Сохранить</button>');
});
var template = Handlebars.compile(profileTempl);
var html = template(data);
document.getElementById('root').innerHTML = html;

let profileForm = document.getElementById('profileForm');
profileForm.onsubmit = (e) => {
    e.preventDefault();
    let formData = new FormData(profileForm);
		let result = {
			oldPassword: formData.get('oldPassword'),
			newPassword: formData.get('newPassword'),
      newPasswordRepeat: formData.get('newPasswordRepeat'),
		}
    console.log('profileForm', result);
  }