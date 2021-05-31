import {loginFormTmpl} from '../../layouts/loginForm/loginForm.hbs';

const data = {
  fields: [
    {
      "label": "Логин",
      "name": "login",
      "value": "vano2021",
      "type": "text",
    },
    {
      "label": "Пароль",
      "name": "password",
      "type": "password",
      "value": "1234",
    },
  ]
}

console.log('--loginFormTmpl--', loginFormTmpl);

Handlebars.registerHelper("submitButton", function() {
  return new Handlebars.SafeString('<button class="custom-button">Зарегистрироваться</button>');
});
Handlebars.registerHelper("loginLink", function() {
  return new Handlebars.SafeString('<a href="./registration.html">Нет аккаунта?</a>');
});
var template = Handlebars.compile(loginFormTmpl);
var html = template(data);
console.log('html', html);
document.getElementById('root').innerHTML = html;

let loginForm = document.getElementById('loginForm');
loginForm.onsubmit = (e) => {
    e.preventDefault();
    let formData = new FormData(loginForm);
		let result = {
			login: formData.get('login'),
			password: formData.get('password'),
		}
    console.log('loginForm', result);
  }