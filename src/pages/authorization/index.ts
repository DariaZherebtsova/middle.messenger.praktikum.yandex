import AuthorizationPage from './authorization';
import insertInDOM from '../../utils/insertInDOM';
import { Input, IInputBlock } from '../../components/input/input';
import Button from '../../components/button/button';
import { IBlock } from '../../components/block/block';
import { validate } from '../../utils/validate';

const data = {
  page: {
    header: 'Вход',
  },
  inputs: [
    {
      label: 'Логин',
      name: 'login',
      type: 'text',
      value: 'vano2022',
    },
    {
      label: 'Пароль',
      name: 'password',
      type: 'password',
      value: '12345',
    },
  ],
  button: {
    text: 'Авторизация',
    events: {
      click: event => submit(event)
    }
  }
};

let authorizationPage = new AuthorizationPage(data.page);
insertInDOM('#root', authorizationPage);

let inputs: IInputBlock[] = [];
for (let i = 0; i < data.inputs.length; i += 1) {
  console.log('----', i);
  let input: IInputBlock = new Input(data.inputs[i]);
  insertInDOM('.login-form__input-box', input);
  inputs.push(input);
}

let button = new Button(data.button);
insertInDOM('.login-form__button-box', button);


function submit(event) {
  console.log('sssssssssssubmit', event);
  event.preventDefault();

  validateAllInputs();
}

function validateAllInputs() {
  inputs.forEach(item => {
    console.log('input value', item.getInputValue());
    const resultValidate = validate(item.getInputValue(), item.props.name)
    if (!resultValidate.valid) {
      item.getElementForErrorMessage().textContent = resultValidate.message;
    } else {
      console.log('validate OK');
      item.getElementForErrorMessage().textContent = '';
    }
  })
}