import Handlebars from 'handlebars';
import { errorPageTempl } from '../../layouts/errorPage/errorPage.hbs';

const data = {
  code: '404',
  msg: 'Не туда попали',
};

const template = Handlebars.compile(errorPageTempl);
const html = template(data);
const root = document.getElementById('root');
if (root) {
  root.innerHTML = html;
}
