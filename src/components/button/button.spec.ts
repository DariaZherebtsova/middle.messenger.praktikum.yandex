import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import Button from './button';

describe('Проверяем компонент Button', () => {
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

  it('Экземпляр класса Button должен cоздавать элемент с тегом - button', () => {
    const button = new Button({});
    expect(button.element.constructor.name).to.eq('HTMLButtonElement');
  });

  it('Экземпляр класса Button в props.text получает текст кнопки', () => {
    const props = {
      text: 'Авторизация',
    };
    const button = new Button(props);
    button.element.click();
    expect(button.element.textContent).to.eq('Авторизация');
  });

  it('Экземпляр класса Button может получать в props обработчики событий', () => {
    const props = {
      text: 'Авторизация',
      events: {
        click: (event: Event) => {
          event.preventDefault();
          event.target.textContent = 'Click';
          return 'click';
        },
      },
    };
    const button = new Button(props);
    button.element.click();
    expect(button.element.textContent).to.eq('Click');
  });
});
