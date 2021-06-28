import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import { Block } from '../components/block/block';
import Router from './router';

describe('Проверяем переходы у Роута', () => {
  beforeEach(() => {
    const dom = new JSDOM(
      `<html>
        <body>
          <div id="root"></div>
        </body>
      </html>`,
      { url: 'http://localhost' },
    );

    global.window = dom.window;
    global.document = dom.window.document;
  });

  it('Переход на новую страницу должен менять состояние сущности history', () => {
    const router = new Router('#root');
    function initBlock() {
      return new Block();
    }
    router.use('/404', initBlock);
    router.start();
    router.go('/404');

    expect(router._currentRoute._pathname).to.eq('/404');
  });
});
