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
      label: 'Старый пароль',
      name: 'oldPassword',
      type: 'password',
      value: '111',
    },
    {
      label: 'Новый пароль',
      name: 'newPassword',
      type: 'password',
      value: '1234',
    },
    {
      label: 'Повторите новый пароль',
      name: 'newPasswordRepeat',
      type: 'password',
      value: '1234',
    },
  ],
};

Handlebars.registerHelper('submitButton', () => new Handlebars.SafeString('<button class="custom-button" type="submit">Сохранить</button>'));
const template = Handlebars.compile(profileTempl);
const html = template(data);
document.getElementById('root').innerHTML = html;

getFormData({ formId: 'profileForm', formFields: ['oldPassword', 'newPassword', 'newPasswordRepeat'] });
