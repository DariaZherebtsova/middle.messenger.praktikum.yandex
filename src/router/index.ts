import { router } from './router';
import { initProfilePage } from '../pages/profile/index';
import { initAuthorizationPage } from '../pages/authorization/index';
import { initRegistrationPage } from '../pages/registration/index';

router
  .use('/auth', initAuthorizationPage)
  .use('/registration', initRegistrationPage)
  .use('/profile', initProfilePage)
  .start();

// Через секунду контент изменится сам, достаточно дёрнуть переход
setTimeout(() => {
  router.go('/registration');
}, 2000);
