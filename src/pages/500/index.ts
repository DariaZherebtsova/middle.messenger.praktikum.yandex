import Handlebars from 'handlebars';
import { errorPageTempl } from '../../layouts/errorPage/errorPage.hbs';

const data = {
  code: '500',
  msg: 'Мы уже фиксим',
};

const hbsTemplateFn = Handlebars.compile(errorPageTempl);
const htmlStr = hbsTemplateFn(data);
const root = document.getElementById('root');
if (root) {
  root.innerHTML = htmlStr;
}
