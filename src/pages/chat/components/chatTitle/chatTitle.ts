import Handlebars from 'handlebars/dist/cjs/handlebars';
import { Block } from '../../../../components/block/block';
import { chatTitleTmpl } from './chatTitle.hbs';

const noImgAvatar = 'img/no_img_circle.svg';

export default class ChatTitle extends Block {
  constructor(props: Record<string, unknown>) {
    // eslint-disable-next-line no-param-reassign
    props.wrapperClass = 'chat-title';
    if (!props.avatar) {
      // eslint-disable-next-line no-param-reassign
      props.avatar = `${noImgAvatar}`;
    }
    super('div', props);
  }

  render(): string {
    const hbsTemplateFn = Handlebars.compile(chatTitleTmpl);
    const htmlStr = hbsTemplateFn(this.props);
    return htmlStr;
  }
}
