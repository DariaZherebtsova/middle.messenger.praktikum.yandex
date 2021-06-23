import Handlebars from 'handlebars';
import { Block } from '../../components/block/block';
import { profileTempl } from '../../layouts/profile/profile.hbs';
import { TProps } from '../../components/block/block.type';

export default class ProfileEditDataPage extends Block {
  constructor(props: TProps) {
    super('div', {
      ...props,
      wrapperClass: 'profile-wrapper',
    });
  }

  render(): string {
    const hbsTemplateFn = Handlebars.compile(profileTempl);
    const htmlStr = hbsTemplateFn(this.props);
    return htmlStr;
  }
}
