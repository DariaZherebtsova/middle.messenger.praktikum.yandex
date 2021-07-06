import Store from './store';

const initProps = {
  userId: null,
  userInfo: null,
  avatar: null,
  chats: [],
  currentChatId: null,
  currentChat: null,
  messages: [],
  lastMessage: null,
};

export const globalStore = new Store(initProps);
export const globalStoreEventBus = globalStore.eventBus();
