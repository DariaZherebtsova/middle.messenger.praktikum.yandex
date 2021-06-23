import { router } from './router';
import { initChatPage } from '../pages/chat/index';
import { initProfilePage } from '../pages/profile/index';
import { initAuthorizationPage } from '../pages/authorization/index';
import { initRegistrationPage } from '../pages/registration/index';
import { initProfileEditDataPage } from '../pages/profileEditData/index';
import { initProfileEditPasswordPage } from '../pages/profileEditPassword/index';

router
  .use('/', initChatPage)
  .use('/auth', initAuthorizationPage)
  .use('/registration', initRegistrationPage)
  .use('/profile', initProfilePage)
  .use('/profile/edit-data', initProfileEditDataPage)
  .use('/profile/edit-password', initProfileEditPasswordPage)
  .start();

// Через секунду контент изменится сам, достаточно дёрнуть переход
// setTimeout(() => {
//   router.go('/registration');
//   console.log('window.history', window.history);
// }, 2000);

// setTimeout(() => {
//   router.go('/');
// }, 4000);
