import Handlebars from 'handlebars';
import { Block } from '../../components/block/block';
import { chatListTmpl } from './chatList.hbs';
import { TProps } from '../../components/block/block.type';

export default class СhatList extends Block {
  constructor(props: TProps) {
    if (!props.wrapperClass) {
      // eslint-disable-next-line no-param-reassign
      props.wrapperClass = 'chat-list';
    }
    super('section', props);
  }

  render(): string {
    const hbsTemplateFn = Handlebars.compile(chatListTmpl);
    const htmlStr = hbsTemplateFn(this.props);
    return htmlStr;
  }
}
