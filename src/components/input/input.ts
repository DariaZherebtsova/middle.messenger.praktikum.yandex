import Handlebars from 'handlebars/dist/cjs/handlebars';
import { Block } from '../block/block';

import { TProps } from '../block/block.type';

export default class Input extends Block {
  constructor(props: TProps) {
    super('input', props);
  }

  render(): string {
    const hbsTemplateFn = Handlebars.compile('');
    const htmlStr = hbsTemplateFn(this.props);
    return htmlStr;
  }
}
