import { Block } from "../block/block";
// Ваш реализованный шаблонизатор
import Handlebars from 'handlebars';
import { buttonTmp } from "./button.hbs";

export default class Button extends Block {
  constructor(props) {
    console.log('--- constructor Button');
    // Создаём враппер DOM-элемент button
    props = {
      ...props,
      wrapperClass: 'custom-button',
    };
    super("button", props);
  }

  render() {
    // В данном случае render возвращает строкой разметку из шаблонизатора
    const template = Handlebars.compile(buttonTmp);
    return template(this.props);
  }
}