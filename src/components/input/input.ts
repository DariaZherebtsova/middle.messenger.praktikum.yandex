import Handlebars from 'handlebars';
import { inputTmp } from './input.hbs';
import { Block } from '../block/block';
import { IInputBlock } from './inputs.type';

import { TProps } from '../block/block.type';

export class Input extends Block implements IInputBlock {
  constructor(props: TProps) {
    // Создаём враппер DOM-элемент для input
    super('div', props);
  }

  get inputElement(): HTMLElement {
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
    const hbsTemplateFn = Handlebars.compile(inputTmp);
    const htmlStr = hbsTemplateFn(this.props);
    return htmlStr;
  }
}
