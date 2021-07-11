import Handlebars from 'handlebars/dist/cjs/handlebars
import { Block } from '../../components/block/block';
import { TProps } from '../../components/block/block.type';

export default class RegistrationPage extends Block {
  constructor(props: TProps) {
    super('div', {
      ...props,
      wrapperClass: 'chat-page-wrapper',
    });
  }

  render(): string {
    const hbsTemplateFn = Handlebars.compile('');
    const htmlStr = hbsTemplateFn(this.props);
    return htmlStr;
  }
}
