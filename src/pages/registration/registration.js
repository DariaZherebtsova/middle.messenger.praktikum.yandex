import {loginFormTmpl} from '../../layouts/loginForm/loginForm.hbs';

const data = {
  header: "Регистрация",
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
      "label": "Телефон",
      "name": "phone",
      "value": "+7 (909) 999 99 99",
      "type": "phone",
    },
    {
      "label": "Пароль",
      "name": "password",
      "type": "password",
      "value": "1234",
    },
    {
      "label": "Пароль (ещё раз)",
      "name": "passwordRepeat",
      "type": "password",
      "value": "1234",
    },
  ]
}

Handlebars.registerHelper("submitButton", function() {
  return new Handlebars.SafeString('<button class="custom-button">Зарегистрироваться</button>');
});
Handlebars.registerHelper("loginLink", function() {
  return new Handlebars.SafeString('<a href="./authorization.html">Войти</a>');
});
var template = Handlebars.compile(loginFormTmpl);
var html = template(data);
document.getElementById('root').innerHTML = html;

let loginForm = document.getElementById('loginForm');
loginForm.onsubmit = (e) => {
    e.preventDefault();
    let formData = new FormData(loginForm);
		let result = {
      first_name: formData.get('first_name'),
			second_name: formData.get('second_name'),
      display_name: formData.get('display_name'),
      login: formData.get('login'),
			email: formData.get('email'),
			phone: formData.get('phone'),
			password: formData.get('password'),
		}
    console.log('loginForm', result);
  }