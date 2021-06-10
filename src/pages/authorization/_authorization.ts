import Handlebars from 'handlebars';
import { loginFormTmpl } from '../../layouts/loginForm/loginForm.hbs';
import getFormData from '../../utils/getFormData';

const data = {
  header: 'Вход',
  fields: [
    {
      label: 'Логин',
      name: 'login',
      type: 'text',
      value: 'vano2022',
    },
    {
      label: 'Пароль',
      name: 'password',
      type: 'password',
      value: '12345',
    },
  ],
};

Handlebars.registerHelper('submitButton', () => new Handlebars.SafeString('<button class="custom-button">Авторизоваться</button>'));
Handlebars.registerHelper('loginLink', () => new Handlebars.SafeString('<a class="custom-link color-green" href="./registration.html">Нет аккаунта?</a>'));
const template = Handlebars.compile(loginFormTmpl);
const html = template(data);
document.getElementById('root').innerHTML = html;

getFormData({ formId: 'loginForm', formFields: ['login', 'password'] });
