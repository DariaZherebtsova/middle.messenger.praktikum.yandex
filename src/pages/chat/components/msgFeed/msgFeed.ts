import Handlebars from 'handlebars';
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
    console.log('--render MsgFeed', this._meta.props);
    const hbsTemplateFn = Handlebars.compile(msgFeedTmpl);
    const htmlStr = hbsTemplateFn(this._meta.props);
    return htmlStr;
  }

  updateChatTitle(newCurrentChat: ChatsResponse): void {}
}
