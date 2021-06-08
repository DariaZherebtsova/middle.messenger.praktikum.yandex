import Handlebars from 'handlebars';
import {errorPageTempl} from '../../layouts/errorPage/errorPage.hbs';

const data = {
  code: '500',
  msg: 'Мы уже фиксим',
}

const template = Handlebars.compile(errorPageTempl);
const html = template(data);
document.getElementById('root').innerHTML = html;