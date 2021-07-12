import Handlebars from 'handlebars/dist/cjs/handlebars';
import { Block } from '../../../../components/block/block';
import { modalTmpl } from './modal.hbs';

export default class Modal extends Block {
  constructor(props: Record<string, any>) {
    if (!props.wrapperClass) {
      // eslint-disable-next-line no-param-reassign
      props.wrapperClass = 'modal';
    }
    super('div', props);
  }

  render(): string {
    const hbsTemplateFn = Handlebars.compile(modalTmpl);
    const htmlStr = hbsTemplateFn(this.props);
    return htmlStr;
  }

  show(): void {
    if (this.element) {
      this.element.style.display = 'flex';
    }
  }
}
