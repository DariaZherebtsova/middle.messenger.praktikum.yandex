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
      "value": "+7 (909) 999 99 99",
      "type": "phone",
    },
  ]
}

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
			first_name: formData.get('first_name'),
			second_name: formData.get('second_name'),
      display_name: formData.get('display_name'),
      login: formData.get('login'),
			email: formData.get('email'),
			phone: formData.get('phone'),
		}
    console.log('profileForm', result);
     
  };