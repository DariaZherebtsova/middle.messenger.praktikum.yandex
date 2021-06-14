import Handlebars from 'handlebars';
import { errorPageTempl } from '../../layouts/errorPage/errorPage.hbs';

const data = {
  code: '404',
  msg: 'Не туда попали',
};

const hbsTemplateFn = Handlebars.compile(errorPageTempl);
const htmlStr = hbsTemplateFn(data);
const root = document.getElementById('root');
if (root) {
  root.innerHTML = htmlStr;
}
