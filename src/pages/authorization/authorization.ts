import Handlebars from 'handlebars';
import { Block } from '../../components/block/block';
import { loginFormTmpl } from '../../layouts/loginForm/loginForm.hbs';
import { TProps } from '../../components/block/block.type';

export default class AuthorizationPage extends Block {
  constructor(props: TProps) {
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
