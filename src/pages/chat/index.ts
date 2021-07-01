import insertInDOM from '../../utils/insertInDOM';
import ChatPage from './chat';
import СhatList from './components/chatList/chatList';
import ChatPreview from './components/chatPreview/chatPreview';
import MsgFeed from './components/msgFeed/msgFeed';
import Input from '../../components/input/input';
import Button from '../../components/button/button';
import { HTTPrequest } from '../../utils/HTTPrequest';
import noImgAvatar from '../../../static/img/no_img_circle.svg';
import { router } from '../../services/router';
import { userAuthController } from '../../controllers/user-auth';
import { chatController } from '../../controllers/chats';
import { globalStore } from '../../store/globalStore';
import { initChatList } from './components/chatList';
import { initMsgFeed } from './components/msgFeed';

export function initChatPage(rootQuery:string): ChatPage {
  // запрашиваем список чатов
  chatController.get();

  // const globalStoreEventBus = globalStore.eventBus();
  // globalStoreEventBus.on('flow:something-has-changed', doChange);

  // function doChange(...args) {
  //   console.log('---doChange', args);
  // }

  const data = {
    msgFeed: {
      attachBtn: {
        wrapperClass: 'msg-feed__attach-btn',
      },
      sendBtn: {
        wrapperClass: 'msg-feed__send-btn',
        events: {
          click: (event: Event) => submit(event),
        },
      },
      msgInput: {
        wrapperClass: 'msg-feed__input',
      },
      noImgAvatar: `${noImgAvatar}`,
      name: 'Илья',
      date: '31 июня',
      msg: 'В траве сидел кузнечик, В траве сидел кузнечик, Совсем как огуречик Зелененький он был.',
    },
  };

  const chatPage = new ChatPage({});
  insertInDOM(rootQuery, chatPage);

  // создаем chatList
  initChatList('.chat-page-wrapper');

  // создаем msgFeed
  initMsgFeed('.chat-page-wrapper');

  const profileLink = document.getElementsByClassName('chat-list__profile-link')[0];
  if (profileLink) {
    profileLink.addEventListener('click', (event: Event) => {
      console.log('---click');
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
