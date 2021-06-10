import TestPage from './test';
import insertInDOM from '../../utils/insertInDOM';
import Input from '../../components/input/input';

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
};

let testPage = new TestPage(data.page);
insertInDOM('#root', testPage);

for (let i = 0; i < 2; i += 1) {
  console.log('----', i);
  let input1 = new Input(data.inputs[i]);
  insertInDOM('.input-box', input1);
}