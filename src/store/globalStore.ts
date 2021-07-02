import Store from './store';

const initProps = {
  userId: null,
  chats: [],
  currentChatId: null,
  currentChat: {
    avatar: '',
    title: 'Илья',
    last_message: 'В траве сидел кузнечик, В траве сидел кузнечик'
  },
};

export const globalStore = new Store(initProps);
