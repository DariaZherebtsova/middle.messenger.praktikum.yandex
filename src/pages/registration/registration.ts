import Handlebars from 'handlebars';
import { Block } from '../../components/block/block';
import { loginFormTmpl } from '../../layouts/loginForm/loginForm.hbs';

export default class RegistrationPage extends Block {
  constructor(props) {
    super('div', {
      ...props,
      wrapperClass: 'login-form-wrapper',
    });
  }

  render(): string {
    const hbsTemplateFn = Handlebars.compile(loginFormTmpl);
    const htmlStr = hbsTemplateFn(this.props);
    return htmlStr;
  }
}