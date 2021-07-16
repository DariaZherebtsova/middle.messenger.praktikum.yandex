import { socketController } from '../controllers/web-socket';

type MsgFormat = {
  content: string,
  type: string
};

export type WebSocketInitData = [
  userId: number,
  chatId: number,
  token: string,
];

export class WebSocketService {
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
    const userLogin = socketController.getUserInfo();
    this._socket.send(JSON.stringify({
      content: `Всем привет от ${userLogin}!`,
      type: 'message',
    }));
  }

  didClose(event: any): void {
    if (event.wasClean) {
      console.log('Соединение закрыто чисто');
    } else {
      console.log('Обрыв соединения');
    }

    console.log(`Код: ${event.code} | Причина: ${event.reason}`);
  }

  receivedMsg(event: any): void {
    console.log('Получены данные', event.data);
    const data = JSON.parse(event.data);
    socketController.setMessage(data);
    socketController.setLastMessage(data.content);
  }

  didError(event: any): void {
    console.log('Ошибка', event.message);
  }

  send(message: MsgFormat): void {
    this._socket.send(JSON.stringify(message));
  }
}
