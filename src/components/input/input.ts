import Handlebars from 'handlebars';
import { Block, IBlock } from '../block/block';
import { validate } from '../../utils/validate/index';
import { inputTmp } from './input.hbs';

export class Input extends Block {
  constructor(props) {
    console.log('--- constructor Input');
    // Создаём враппер DOM-элемент input
    super('div', props);
  }

  get inputElement(): HTMLElement {
    return this.element.getElementsByTagName('input')[0];
  }

  getElementForEvent(): HTMLElement {
    return this.inputElement;
  }

  getElementForErrorMessage(): Element | void {
    const errorMessageEl = this.element.querySelector('.error-message');
    if (errorMessageEl) {
      return errorMessageEl;
    }
    return undefined;
  }

  render(): string {
    // В данном случае render возвращает строкой разметку из шаблонизатора
    const hbsTemplateFn = Handlebars.compile(inputTmp);
    const htmlStr = hbsTemplateFn(this.props);
    return htmlStr;
  }
}
