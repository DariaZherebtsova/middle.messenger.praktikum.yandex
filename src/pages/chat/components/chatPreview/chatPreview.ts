import Handlebars from 'handlebars/dist/cjs/handlebars';
import { Block } from '../../../../components/block/block';
import { chatPreviewTmpl } from './chatPreview.hbs';
import { TProps } from '../../../../components/block/block.type';

export default class ChatPreview extends Block {
  constructor(props: TProps) {
    if (!props.wrapperClass) {
      // eslint-disable-next-line no-param-reassign
      props.wrapperClass = 'chat-preview';
    }
    super('div', props);
  }

  render(): string {
    const hbsTemplateFn = Handlebars.compile(chatPreviewTmpl);
    const htmlStr = hbsTemplateFn(this.props);
    return htmlStr;
  }

  get chatInfo(): TProps {
    return this.meta.props;
  }
}
