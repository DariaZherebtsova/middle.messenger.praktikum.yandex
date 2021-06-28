import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import { Block } from './block';

describe('Проверяем класс Block', () => {
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

  it('Экземпляр класса Block должен cоздавать элемент с заданным тегом - div', () => {
    const block = new Block('div', {});
    expect(block.element.constructor.name).to.eq('HTMLDivElement');
  });

  it('Экземпляр класса Block должен cоздавать элемент с заданным тегом - input', () => {
    const block = new Block('input', {});
    expect(block.element.constructor.name).to.eq('HTMLInputElement');
  });

  it('Экземпляр класса Block может получать в props обработчики событий', () => {
    const props = {
      events: {
        click: (event) => {
          event.preventDefault();
          event.target.textContent = 'Click';
          return 'click';
        },
      },
    };
    const button = new Block('button', props);
    button.element.click();
    expect(button.element.textContent).to.eq('Click');
  });
});
