import Handlebars from 'handlebars';
import { Block } from '../../components/block/block';
import { chatListTmpl } from './chatList.hbs';

export default class СhatList extends Block {
  constructor(props) {
    if (!props.wrapperClass) {
      props.wrapperClass = 'chat-list';
    }
    super('section', props);
  }

  render(): string {
    console.log('---render chatList', this.props);

    const hbsTemplateFn = Handlebars.compile(chatListTmpl);
    const htmlStr = hbsTemplateFn(this.props);
    return htmlStr;
  }
}
