import Handlebars from 'handlebars/dist/cjs/handlebars';
import { Block } from '../../../../components/block/block';
import { dropdownTmpl } from './dropdown.hbs';

export default class Dropdown extends Block {
  constructor(props: Record<string, unknown>) {
    if (!props.wrapperClass) {
      // eslint-disable-next-line no-param-reassign
      props.wrapperClass = 'dropdown-box';
    }
    super('div', props);
  }

  render(): string {
    const hbsTemplateFn = Handlebars.compile(dropdownTmpl);
    const htmlStr = hbsTemplateFn(this.props);
    return htmlStr;
  }

  get dropdown(): HTMLElement {
    return this.element.getElementsByTagName('ul')[0];
  }
}
