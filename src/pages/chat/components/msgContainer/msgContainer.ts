import Handlebars from 'handlebars';
import { Block } from '../../../../components/block/block';
import { msgContainerTmpl } from './msgContainer.hbs';

export default class MsgContainer extends Block {
  constructor(props: Record<string, any>) {
    console.log('----props MsgContainer', props);
    if (!props.wrapperClass) {
      // eslint-disable-next-line no-param-reassign
      props.wrapperClass = 'msg-container';
    }
    super('ul', props);
  }

  render(): string {
    console.log('----render MsgContainer');
    const hbsTemplateFn = Handlebars.compile(msgContainerTmpl);
    const htmlStr = hbsTemplateFn(this.props);
    return htmlStr;
  }
}
