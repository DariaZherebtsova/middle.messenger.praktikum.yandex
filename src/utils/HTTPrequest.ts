const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

function queryStringify(data) {
  // трансформация GET-параметров
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }
  let result = '?';
  Object.keys(data).forEach(item => {
    result += `${item}=${data[item].toString()}&`;
  });
  return result.slice(0, -1);
}

type Options = {
  headers?: Record<string, string>,
  method?,
  data?,
  timeout?: number,
};

export class HTTPrequest {
  get = (url: string, options: Options = {}): Promise<unknown> => this.request(
    url,
    { ...options, method: METHODS.GET },
    options.timeout,
  );

  post = (url: string, options: Options = {}): Promise<unknown> => this.request(
    url,
    { ...options, method: METHODS.POST },
    options.timeout,
  );

  put = (url: string, options: Options = {}): Promise<unknown> => this.request(
    url,
    { ...options, method: METHODS.PUT },
    options.timeout,
  );

  delete = (url: string, options: Options = {}): Promise<unknown> => this.request(
    url,
    { ...options, method: METHODS.DELETE },
    options.timeout,
  );

  request = (url:string, options: Options = {}, timeout = 5000): Promise<unknown> => {
    const { headers = {}, method, data } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject(new Error('No method'));
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      xhr.open(
        method,
        isGet && !!data
          ? `${url}${queryStringify(data)}`
          : url,
      );

      Object.keys(headers).forEach(key => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function onload() {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}
