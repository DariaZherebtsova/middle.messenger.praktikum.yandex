import Handlebars from 'handlebars/dist/cjs/handlebars';
import { Block } from '../../../../components/block/block';
import { msgContainerTmpl } from './msgContainer.hbs';

export default class MsgContainer extends Block {
  constructor(props: Record<string, unknown>) {
    if (!props.wrapperClass) {
      // eslint-disable-next-line no-param-reassign
      props.wrapperClass = 'msg-container';
    }
    super('ul', props);
  }

  render(): string {
    const hbsTemplateFn = Handlebars.compile(msgContainerTmpl);
    const htmlStr = hbsTemplateFn(this.props);
    return htmlStr;
  }
}
