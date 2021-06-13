import Handlebars from 'handlebars';
import { Block } from '../../components/block/block';
import { msgFeedTmpl } from './msgFeed.hbs';

export default class MsgFeed extends Block {
  constructor(props) {
    if (!props.wrapperClass) {
      props.wrapperClass = 'msg-feed';
    }
    super('section', props);
  }

  render(): string {
    console.log('---render msgFeed', this.props);

    const hbsTemplateFn = Handlebars.compile(msgFeedTmpl);
    const htmlStr = hbsTemplateFn(this.props);
    return htmlStr;
  }
}
