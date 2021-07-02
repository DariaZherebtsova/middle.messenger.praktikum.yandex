import Handlebars from 'handlebars';
import { Block } from '../../../../components/block/block';
import { chatTitleTmpl } from './chatTitle.hbs';

export default class ChatTitle extends Block {
  constructor(props: Record<string, any>) {
    if (!props.wrapperClass) {
      // eslint-disable-next-line no-param-reassign
      props.wrapperClass = 'chat-title';
    }
    super('div', props);
  }

  render(): string {
    const hbsTemplateFn = Handlebars.compile(chatTitleTmpl);
    const htmlStr = hbsTemplateFn(this.props);
    return htmlStr;
  }
}
