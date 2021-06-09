import Handlebars from 'handlebars';
import { profileTempl } from '../../layouts/profile/profile.hbs';
import backBtnImg from '../../../static/img/back-btn.png';
import noImgAvatarLarge from '../../../static/img/noImgAvatar-large.png';
import getFormData from '../../utils/getFormData';

const data = {
  backBtnImg,
  noImgAvatarLarge,
  fields: [
    {
      label: 'Почта',
      name: 'email',
      value: 'pochta@yandex.ru',
      type: 'email',
    },
    {
      label: 'Логин',
      name: 'login',
      value: 'vano2021',
      type: 'text',
    },
    {
      label: 'Имя',
      name: 'first_name',
      value: 'Иван',
      type: 'text',
    },
    {
      label: 'Фамилия',
      name: 'second_name',
      value: 'Иванов',
      type: 'text',
    },
    {
      label: 'Имя в чате',
      name: 'display_name',
      value: 'Vano',
      type: 'text',
    },
    {
      label: 'Телефон',
      name: 'phone',
      value: '+7 (909) 999 99 99',
      type: 'phone',
    },
  ],
};

Handlebars.registerHelper('submitButton', () => new Handlebars.SafeString('<button class="custom-button" type="submit">Сохранить</button>'));
const template = Handlebars.compile(profileTempl);
const html = template(data);
document.getElementById('root').innerHTML = html;

getFormData({
  formId: 'profileForm',
  formFields: ['first_name', 'second_name', 'display_name', 'login', 'email', 'phone'],
});
