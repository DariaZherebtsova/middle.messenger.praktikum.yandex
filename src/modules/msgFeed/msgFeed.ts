import Handlebars from 'handlebars';
import { Block } from '../../components/block/block';
import { msgFeedTmpl } from './msgFeed.hbs';
import { TProps } from '../../components/block/block.type';

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
    const htmlStr = hbsTemplateFn(this.props);
    return htmlStr;
  }
}
