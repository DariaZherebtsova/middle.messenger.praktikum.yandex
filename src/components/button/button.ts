import Handlebars from 'handlebars';
import { Block } from '../block/block';
import { buttonTmp } from './button.hbs';
import { TProps } from '../block/block.type';

export default class Button extends Block {
  constructor(props: TProps) {
    // Создаём враппер DOM-элемент button
    if (!props.wrapperClass) {
      // eslint-disable-next-line no-param-reassign
      props.wrapperClass = 'custom-button';
    }
    super('button', props);
  }

  render(): string {
    const hbsTemplateFn = Handlebars.compile(buttonTmp);
    const htmlStr = hbsTemplateFn(this.props);
    return htmlStr;
  }
}
