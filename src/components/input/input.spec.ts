import { expect, assert } from 'chai';
import { JSDOM } from 'jsdom';
import Input from './input';

describe('Проверяем компонент Input', () => {
  beforeEach(() => {
    const dom = new JSDOM(
      `<html>
        <body>
        </body>
      </html>`,
      { url: 'http://localhost' },
    );

    global.window = dom.window;
    global.document = dom.window.document;
  });

  it('Экземпляр класса Input должен иметь геттер inputElement', () => {
    const input = new Input({});
    assert.notEqual(input.inputElement, undefined);
  });

  it('В экземпляре класса Input геттер inputElement должен возвращать input элемент', () => {
    const input = new Input({});
    expect(input.inputElement.constructor.name).to.eq('HTMLInputElement');
  });

  it('Экземпляр класса Input должен иметь метод getElementForErrorMessage', () => {
    const input = new Input({});
    assert.notEqual(input.getElementForErrorMessage(), undefined);
  });

  it('Экземпляр класса Input метод getElementForEvent должен возвращать input элемент', () => {
    const input = new Input({});
    const inputElement = input.getElementForEvent();
    expect(inputElement.constructor.name).to.eq('HTMLInputElement');
  });
});
