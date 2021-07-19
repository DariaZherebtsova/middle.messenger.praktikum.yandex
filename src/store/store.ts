import { EventBus } from '../utils/event-bus';

type TProps = Record<string, any>;

export default class Store {
  _globalStore: Record<string, any>;

  public props: TProps = <TProps>{};

  eventBus: () => EventBus;

  static EVENTS = {
    FLOW_SHC: 'flow:something-has-changed',
  };

  constructor(props: TProps) {
    const eventBus = new EventBus();

    this._globalStore = this._makePropsProxy(props);

    this.eventBus = () => eventBus;
  }

  private _makePropsProxy(props: TProps): TProps {
    const self = this;

    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop: string, value) {
        // eslint-disable-next-line no-param-reassign
        target[prop] = value;
        // Запускаем обновление компоненты
        self.eventBus().emit(Store.EVENTS.FLOW_SHC, prop);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  setStore(fild: string, data: any): void {
    this._globalStore[fild] = data;
  }

  getStore(fild: string): any {
    return this._globalStore[fild];
  }

  setMessages(msgList: any[]): void {
    this._globalStore.messages = msgList;
  }

  addMessage(msg: any): void {
    this._globalStore.messages.push(msg);
  }

  clearStore(): void {
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
    this._globalStore = this._makePropsProxy(initProps);
    this.eventBus().listeners = {};
  }
}
