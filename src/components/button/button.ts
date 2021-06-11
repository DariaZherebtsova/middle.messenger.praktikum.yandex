import Handlebars from 'handlebars';
import { Block } from '../block/block';
// Ваш реализованный шаблонизатор
import { buttonTmp } from './button.hbs';

export default class Button extends Block {
  constructor(props) {
    console.log('--- constructor Button');
    // Создаём враппер DOM-элемент button
    if (!props.wrapperClass) {
      props.wrapperClass = 'custom-button';
    }
    super('button', props);
  }

  render(): string {
    // В данном случае render возвращает строкой разметку из шаблонизатора
    const hbsTemplateFn = Handlebars.compile(buttonTmp);
    const htmlStr = hbsTemplateFn(this.props);
    return htmlStr;
  }
}
