import Handlebars from 'handlebars';
import { Block } from '../../components/block/block';
import { loginFormTmpl } from '../../layouts/loginForm/loginForm.hbs';

export default class AuthorizationPage extends Block {
  constructor(props) {
    super('div', {
      ...props,
      wrapperClass: 'login-form-wrapper',
    });
  }

  render(): string {
    Handlebars.registerHelper('loginLink', () => new Handlebars.SafeString('<a class="custom-link color-green" href="./registration.html">Нет аккаунта?</a>'));
    const hbsTemplateFn = Handlebars.compile(loginFormTmpl);
    const htmlStr = hbsTemplateFn(this.props);
    return htmlStr;
  }
}
