import Handlebars from 'handlebars';
import {loginFormTmpl} from '../../layouts/loginForm/loginForm.hbs';
import getFormData from '../../utils/getFormData';

const data = {
  header: "Регистрация",
  fields: [
    {
      'label': 'Почта',
      'name': 'email',
      'value': 'pochta@yandex.ru',
      'type': 'email',
    },
    {
      'label': 'Логин',
      'name': 'login',
      'value': 'vano2021',
      'type': 'text',
    },
    {
      'label': 'Имя',
      'name': 'first_name',
      'value': 'Иван',
      'type': 'text',
    },
    {
      'label': 'Фамилия',
      'name': 'second_name',
      'value': 'Иванов',
      'type': 'text',
    },
    {
      'label': 'Телефон',
      'name': 'phone',
      'value': '+7 (909) 999 99 99',
      'type': 'phone',
    },
    {
      'label': 'Пароль',
      'name': 'password',
      'type': 'password',
      'value': '1234',
    },
    {
      'label': 'Пароль (ещё раз)',
      'name': 'passwordRepeat',
      'type': 'password',
      'value': '1234',
    },
  ]
}

Handlebars.registerHelper('submitButton', function() {
  return new Handlebars.SafeString('<button class="custom-button">Зарегистрироваться</button>');
});
Handlebars.registerHelper('loginLink', function() {
  return new Handlebars.SafeString('<a class="custom-link color-green" href="./authorization.html">Войти</a>');
});
const template = Handlebars.compile(loginFormTmpl);
const html = template(data);
document.getElementById('root').innerHTML = html;

getFormData({ 
    formId: 'loginForm', 
    formFields: [
      'first_name',
      'second_name',
      'display_name',
      'login',
      'email',
      'phone',
      'password'
    ]
  });
