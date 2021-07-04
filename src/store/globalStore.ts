import Store from './store';

const initProps = {
  userId: null,
  userInfo: null,
  chats: [],
  currentChatId: null,
  currentChat: null,
  messages: [
    { content: 'Привет 1' },
    { content: 'Привет 2' },
    { content: 'Привет 3' },
  ],
  lastMessage: null,
};

export const globalStore = new Store(initProps);
export const globalStoreEventBus = globalStore.eventBus();
