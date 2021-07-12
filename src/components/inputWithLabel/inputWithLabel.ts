import Handlebars from 'handlebars/dist/cjs/handlebars';
import { inputWithLabelTmp } from './inputWithLabel.hbs';
import { Block } from '../block/block';
import { IInputBlock } from './inputWithLabel.type';

import { TProps } from '../block/block.type';

export default class InputWithLabel extends Block implements IInputBlock {
  constructor(props: TProps) {
    super('div', props);
  }

  get inputElement(): HTMLInputElement {
    return this.element.getElementsByTagName('input')[0];
  }

  getElementForEvent(): HTMLElement {
    return this.inputElement;
  }

  getElementForErrorMessage(): Element | null {
    const errorMessageEl = this.element.querySelector('.error-message');
    return errorMessageEl;
  }

  render(): string {
    const hbsTemplateFn = Handlebars.compile(inputWithLabelTmp);
    const htmlStr = hbsTemplateFn(this.props);
    return htmlStr;
  }
}
