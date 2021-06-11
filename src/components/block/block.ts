import { EventBus, IEventBus } from '../../utils/event-bus';

export interface IBlock {
  props: {
    wrapperClass?: string,
  };
  getElementForEvent(): HTMLElement;
  getWrapperElement(): HTMLElement;
}

export class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  _element: HTMLElement = document.createElement('div');

  _meta: {
    tagName: string;
    props?: object;
  } | null = null;

  props: {
    events?: object,
    wrapperClass?: string,
    extraClass?: string,
  } = {};

  eventBus: () => IEventBus;

  /** JSDoc
   * @param {string} tagName
   * @param {Object} props
   *
   * @returns {void}
   */
  constructor(tagName = 'div', props = {}) {
    const eventBus = new EventBus();
    this._meta = {
      tagName,
      props,
    };

    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT);
  }

  _registerEvents(eventBus): void {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _addEvents(): void {
    const { events = {} } = this.props;
    const element = this.getElementForEvent();
    Object.keys(events).forEach((eventName) => {
      // console.log('element', element);
      // console.log('eventName', eventName);
      // console.log('fn', events[eventName]);
      element.addEventListener(eventName, events[eventName]);
    });
  }

  getElementForEvent(): HTMLElement {
    return this._element;
  }

  _removeEvents(): void {
    const { events = {} } = this.props;
    const element = this.getElementForEvent();
    Object.keys(events).forEach((eventName) => {
      element.removeEventListener(eventName, events[eventName]);
    });
  }

  _createResources(): void {
    // console.log('----_createResources---', this._meta?.tagName);
    const tagName = this._meta?.tagName;
    this._element = this._createDocumentElement(tagName);
    if (this.props.wrapperClass) {
      this._element.classList.add(this.props.wrapperClass);
    }
    if (this.props.extraClass) {
      this._element.classList.add(this.props.extraClass);
    }
  }

  init(): void {
    // console.log('----init---', this._meta?.tagName);
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidMount(): void {
    // console.log('----_componentDidMount---', this._meta?.tagName);
    this.componentDidMount();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  componentDidMount(): void {}

  _componentDidUpdate(oldProps, newProps): void {
    // console.log('---componentDidUpdate---');
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  componentDidUpdate(oldProps, newProps): boolean {
    return true;
  }

  setProps = (nextProps): void => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element(): HTMLElement {
    return this._element;
  }

  _render(): void {
    // console.log('----_render---');
    const block: string = this.render();

    if (this.getElementForEvent()) {
      this._removeEvents();
    }

    this._element.innerHTML = block;

    this._addEvents();
  }

  render(): string { return ''; }

  getWrapperElement(): HTMLElement | void {
    return this.element;
  }

  _makePropsProxy(props): void {
    // console.log('---_makePropsProxy---');
    // Можно и так передать this
    // Такой способ больше не применяется с приходом ES6+
    const self = this;

    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop, value) {
        target[prop] = value;

        // Запускаем обновление компоненты
        // Плохой cloneDeep, в след итерации нужно заставлять добавлять cloneDeep им самим
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target }, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  _createDocumentElement(tagName: string): HTMLElement {
    return document.createElement(tagName);
  }

  show(): void {
    if (this.element) {
      this.element.style.display = 'block';
    }
  }

  hide(): void {
    if (this.element) {
      this.element.style.display = 'none';
    }
  }
}
