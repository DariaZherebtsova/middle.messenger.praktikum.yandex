import insertInDOM from '../../utils/insertInDOM';
import ChatPage from './chat';
import { router } from '../../services/router';
import { userAuthController } from '../../controllers/user-auth';
import { chatController } from '../../controllers/chats';
import { globalStoreEventBus } from '../../store/globalStore';
import { initChatList } from './components/chatList';
import { initMsgFeed } from './components/msgFeed';

export async function initChatPage(rootQuery:string): Promise<ChatPage> {
  // запрашиваем список чатов
  chatController.get();
  //  и информацию о пользователе
  userAuthController.getUserInfo();

  const chatPage = new ChatPage({});
  insertInDOM(rootQuery, chatPage);

  // создаем chatList
  initChatList('.chat-page-wrapper');

  // создаем msgFeed
  const msgFeed = await initMsgFeed('.chat-page-wrapper');
  msgFeed.hide();

  // подписываемся на изменение currentChat
  globalStoreEventBus.on('flow:something-has-changed', doChangeMsgFeed);

  async function doChangeMsgFeed(...args: any) {
    if (args[0] === 'currentChat') {
      console.log('---change currentChat');
      const newCurrentChat = chatController.getCurrentChat();
      msgFeed.updateChat(newCurrentChat);
      msgFeed.show();
    }
  }

  const profileLink = document.getElementsByClassName('chat-list__profile-link')[0];
  if (profileLink) {
    profileLink.addEventListener('click', (event: Event) => {
      event.preventDefault();
      router.go('/profile');
    });
  }

  const authLink = document.getElementsByClassName('chat-list__auth-link')[0];
  if (authLink) {
    authLink.addEventListener('click', (event: Event) => {
      event.preventDefault();
      userAuthController.logout();
      router.go('/auth');
    });
  }

  const page404Link = document.getElementsByClassName('chat-list__404-link')[0];
  if (page404Link) {
    page404Link.addEventListener('click', (event: Event) => {
      event.preventDefault();
      router.go('/404');
    });
  }

  const page500Link = document.getElementsByClassName('chat-list__500-link')[0];
  if (page500Link) {
    page500Link.addEventListener('click', (event: Event) => {
      event.preventDefault();
      router.go('/500');
    });
  }

  return chatPage;
}
