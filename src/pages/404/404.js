import {errorPageTempl} from '../../layouts/errorPage/errorPage.hbs';

const data = {
  code: "404",
  msg: "Не туда попали",
}

var template = Handlebars.compile(errorPageTempl);
var html = template(data);
document.getElementById('root').innerHTML = html;