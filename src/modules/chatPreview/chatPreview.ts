import Handlebars from 'handlebars';
import { Block } from '../../components/block/block';
import { chatPreviewTmpl } from './chatPreview.hbs';

export default class ChatPreview extends Block {
  constructor(props) {
    if (!props.wrapperClass) {
      props.wrapperClass = 'chat-preview';
    }
    super('div', props);
  }

  render(): string {
    console.log('---render chatPreview', this.props);
    const hbsTemplateFn = Handlebars.compile(chatPreviewTmpl);
    const htmlStr = hbsTemplateFn(this.props);
    return htmlStr;
  }
}
