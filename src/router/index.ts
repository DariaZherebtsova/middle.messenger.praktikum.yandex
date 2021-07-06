import { router } from '../services/router';
import { initChatPage } from '../pages/chat/index';
import { initProfilePage } from '../pages/profile/index';
import { initAuthorizationPage } from '../pages/authorization/index';
import { initRegistrationPage } from '../pages/registration/index';
import { initProfileEditDataPage } from '../pages/profileEditData/index';
import { initProfileEditPasswordPage } from '../pages/profileEditPassword/index';
import { initError404Page, initError500Page } from '../pages/errorPages/index';
import 'regenerator-runtime/runtime';

router
  .use('/', initChatPage)
  .use('/auth', initAuthorizationPage)
  .use('/registration', initRegistrationPage)
  .use('/profile', initProfilePage)
  .use('/profile/edit-data', initProfileEditDataPage)
  .use('/profile/edit-password', initProfileEditPasswordPage)
  .use('/404', initError404Page)
  .use('/500', initError500Page)
  .start();
