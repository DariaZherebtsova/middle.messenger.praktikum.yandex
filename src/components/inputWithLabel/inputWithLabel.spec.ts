import { expect, assert } from 'chai';
import { JSDOM } from 'jsdom';
import InputWithLabel from './inputWithLabel';

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

  it('Экземпляр класса InputWithLabel должен иметь геттер inputElement', () => {
    const input = new InputWithLabel({});
    assert.notEqual(input.inputElement, undefined);
  });

  it('В экземпляре класса InputWithLabel геттер inputElement должен возвращать input элемент', () => {
    const input = new InputWithLabel({});
    expect(input.inputElement.constructor.name).to.eq('HTMLInputElement');
  });

  it('Экземпляр класса InputWithLabel должен иметь метод getElementForErrorMessage', () => {
    const input = new InputWithLabel({});
    assert.notEqual(input.getElementForErrorMessage(), undefined);
  });

  it('Экземпляр класса InputWithLabel метод getElementForEvent должен возвращать input элемент', () => {
    const input = new InputWithLabel({});
    const inputElement = input.getElementForEvent();
    expect(inputElement.constructor.name).to.eq('HTMLInputElement');
  });
});
