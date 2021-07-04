import Store from './store';

const initProps = {
  userId: null,
  userInfo: null,
  chats: [],
  currentChatId: null,
  currentChat: null,
  messages: [],
  lastMessage: null,
  firstRenderMsgFeed: true,
};

export const globalStore = new Store(initProps);
export const globalStoreEventBus = globalStore.eventBus();
