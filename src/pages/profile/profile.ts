import Handlebars from 'handlebars';
import { Block } from '../../components/block/block';
import { profileTempl } from '../../layouts/profile/profile.hbs';

export default class ProfilePage extends Block {
  constructor(props) {
    console.log('----constructor ProfilePage');

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