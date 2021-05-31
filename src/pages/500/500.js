import {errorPageTempl} from '../../layouts/errorPage/errorPage.hbs';

const data = {
  code: "500",
  msg: "Мы уже фиксим",
}

var template = Handlebars.compile(errorPageTempl);
var html = template(data);
document.getElementById('root').innerHTML = html;