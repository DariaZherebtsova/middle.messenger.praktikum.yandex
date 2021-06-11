import AuthorizationPage from './authorization';
import insertInDOM from '../../utils/insertInDOM';
import { Input, IInputBlock } from '../../components/input/input';
import Button from '../../components/button/button';
import { validate } from '../../utils/validate/index';

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
      validateRule: 'required',
    },
    {
      label: 'Пароль',
      name: 'password',
      type: 'password',
      value: '12345',
      validateRule: 'required',
    },
  ],
  button: {
    text: 'Авторизация',
    events: {
      click: (event) => submit(event),
    },
  },
};

const authorizationPage = new AuthorizationPage(data.page);
insertInDOM('#root', authorizationPage);

const inputs: IInputBlock[] = [];
for (let i = 0; i < data.inputs.length; i += 1) {
  let props = {
    wrapperClass: 'custom-input',
    ...data.inputs[i],
  };
  const input: IInputBlock = new Input(props);
  insertInDOM('.login-form__input-box', input);
  inputs.push(input);
}

const button = new Button(data.button);
insertInDOM('.login-form__button-box', button);

function submit(event) {
  console.log('sssssssssssubmit', event);
  event.preventDefault();

  validateAllInputs();
}

function validateAllInputs() {
  inputs.forEach((item) => {
    console.log('input value', item.inputElement.value);
    const resultValidate = validate(item.inputElement.value, item.props.validateRule);
    if (!resultValidate.valid) {
      item.getElementForErrorMessage().textContent = resultValidate.message;
    } else {
      console.log('validate OK');
      item.getElementForErrorMessage().textContent = '';
    }
  });
}
