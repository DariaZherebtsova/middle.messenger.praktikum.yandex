import Handlebars from 'handlebars';
import { Block, IBlock } from '../block/block';
import { validate } from '../../utils/validate/index';
import { inputTmp } from './input.hbs';

export interface IInputBlock extends IBlock {
  inputElement: HTMLElement;
  getElementForErrorMessage?(): HTMLElement;
}

export class Input extends Block {
  constructor(props) {
    console.log('--- constructor Input');
    // Создаём враппер DOM-элемент input
    props = {
      ...props,
      events: {
        focus: (event) => {
          console.log('focus on', event.target);
        },
        blur: (event) => {
          const resultValidate = validate(event.target.value, event.target.name);

          if (!resultValidate.valid) {
            event.target.parentElement.parentElement.querySelector('.error-message').textContent = resultValidate.message;
          } else {
            console.log('validate OK');
            event.target.parentElement.parentElement.querySelector('.error-message').textContent = '';
          }
        },
      },
    };
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
