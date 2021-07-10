export const baseUrl = 'https://ya-praktikum.tech/api/v2';

export class BaseAPI {
  // На случай, если забудете переопределить метод и используете его, — выстрелит ошибка
  create(any): Promise<any> { throw new Error('Not implemented'); }

  request(any): Promise<any> { throw new Error('Not implemented'); }

  update(any): Promise<any> { throw new Error('Not implemented'); }

  delete(any): Promise<any> { throw new Error('Not implemented'); }
}
