type MsgFormat = {
  content: string,
  type: string
};

export default class WebSocketService {
  _socket: WebSocket;

  constructor(userId: number, chatId: number, token: string) {
    const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);
    this._socket = socket;

    this.init();
  }

  init(): void {
    this._socket.addEventListener('open', this.didOpen.bind(this));

    this._socket.addEventListener('close', this.didClose.bind(this));

    this._socket.addEventListener('message', this.receivedMsg.bind(this));

    this._socket.addEventListener('error', this.didError.bind(this));
  }

  didOpen(): void {
    console.log('Соединение установлено');

    this._socket.send(JSON.stringify({
      content: 'Моё второе сообщение миру!',
      type: 'message',
    }));
  }

  didClose(event): void {
    if (event.wasClean) {
      console.log('Соединение закрыто чисто');
    } else {
      console.log('Обрыв соединения');
    }

    console.log(`Код: ${event.code} | Причина: ${event.reason}`);
  }

  receivedMsg(event): void {
    console.log('Получены данные', event.data);
    // const state = payload.state;
    // chat.setProps(state);
  }

  didError(event): void {
    console.log('Ошибка', event.message);
  }

  send(message: MsgFormat): void {
    console.log('---send', message);
    this._socket.send(JSON.stringify(message));
  }
}