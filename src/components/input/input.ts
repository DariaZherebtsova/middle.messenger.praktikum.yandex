import { Block } from "../block/block";
import Handlebars from 'handlebars';
import { validate } from '../../utils/validate';
import { inputTmp } from "./input.hbs";

export interface IInputBlock {
  props: {
    wrapperClass?: string,
  };
  getElementForEvent(): HTMLElement;
  getInputValue(): string;
  getElementForErrorMessage(): HTMLElement;
}

export class Input extends Block {
  constructor(props) {
    console.log('--- constructor Input');
    // Создаём враппер DOM-элемент input
    props = {
      ...props,
      wrapperClass: 'custom-input',
      events: {
        focus: event => {
          console.log('focus on', event.target);
        },
        blur: event => {
          const resultValidate = validate(event.target.value, event.target.name)
          if (!resultValidate.valid) {
            event.target.parentElement.querySelector('.error-message').textContent = resultValidate.message;
          } else {
            console.log('validate OK')
            event.target.parentElement.querySelector('.error-message').textContent = '';
          }
        },
      },
    };
    super('div', props);
  }

  getElementForEvent() {
    return <HTMLElement>this.element.getElementsByTagName('input')[0];
  }

  getInputValue() {
    return this.element.getElementsByTagName('input')[0].value;
  }

  getElementForErrorMessage() {
    console.log('---getElementForError', this.element.querySelector('.error-message'));
    return this.element.querySelector('.error-message');
  }

  render() {
    // console.log('---Input render');
    
    // В данном случае render возвращает строкой разметку из шаблонизатора
    const template = Handlebars.compile(inputTmp);
    // console.log('---Input props', this.props);
    return template(this.props);
  }
}