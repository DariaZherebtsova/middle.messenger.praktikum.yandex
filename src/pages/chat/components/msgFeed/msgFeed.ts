import Handlebars from 'handlebars/dist/cjs/handlebars';
import { Block } from '../../../../components/block/block';
import { msgFeedTmpl } from './msgFeed.hbs';
import { TProps } from '../../../../components/block/block.type';
import { ChatsResponse } from '../../../../controllers/types';

export default class MsgFeed extends Block {
  constructor(props: TProps) {
    if (!props.wrapperClass) {
      // eslint-disable-next-line no-param-reassign
      props.wrapperClass = 'msg-feed';
    }
    super('section', props);
  }

  render(): string {
    const hbsTemplateFn = Handlebars.compile(msgFeedTmpl);
    const htmlStr = hbsTemplateFn(this.meta.props);
    return htmlStr;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateChat(_newCurrentChat: ChatsResponse): void {}
}
