import Handlebars from 'handlebars';
import { Block } from '../../components/block/block';
import { errorPageTempl } from './errorPage.hbs';
import { TProps } from '../../components/block/block.type';

export default class ErrorPage extends Block {
  constructor(props: TProps) {
    super('div', {
      ...props,
      wrapperClass: 'error-page-wrapper',
    });
  }

  render(): string {
    const hbsTemplateFn = Handlebars.compile(errorPageTempl);
    const htmlStr = hbsTemplateFn(this.props);
    return htmlStr;
  }
}
