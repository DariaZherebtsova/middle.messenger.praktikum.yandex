import Handlebars from 'handlebars';
import Block from '../../components/block/block';
import { testTempl } from './test.hbs';


export default class TestPage extends Block {
  constructor(props) {
    console.log('----constructor TestPage');
     
    super("div", {
      ...props,
      wrapperClass: "login-form-wrapper",
    });
  }

  componentDidMount() {   
    // setTimeout(() => {
    //   this.setProps({
    //       name: "Login 3",
    //   });
    // }, 5000);
  }

  render() {
    // console.log('---TestPage render');
    const hbsTemplateFn = Handlebars.compile(testTempl);    
    const htmlStr = hbsTemplateFn(this.props);

    return htmlStr;
  }
}



