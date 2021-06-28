import ErrorPage from './errorPage';
import insertInDOM from '../../utils/insertInDOM';
import { router } from '../../services/router';

export function initError404Page(rootQuery:string): ErrorPage {
  const data = {
    code: '404',
    msg: 'Не туда попали',
  };

  const error404Page = new ErrorPage(data);
  insertInDOM(rootQuery, error404Page);

  const backLink = document.getElementsByClassName('error-page__back-link')[0];
  if (backLink) {
    backLink.addEventListener('click', () => {
      router.go('/');
    });
  }

  return error404Page;
}

export function initError500Page(rootQuery:string): ErrorPage {
  const data = {
    code: '500',
    msg: 'Мы уже фиксим',
  };

  const error500Page = new ErrorPage(data);
  insertInDOM(rootQuery, error500Page);

  const backLink = document.getElementsByClassName('error-page__back-link')[0];
  if (backLink) {
    backLink.addEventListener('click', () => {
      router.go('/');
    });
  }

  return error500Page;
}
