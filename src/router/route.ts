import { Block } from '../components/block/block';

export default class Route {
  _pathname: string;

  _blockInit: (rootQuery:string) => Block;

  _block: Block;

  _props: Record<string, string>;

  constructor(pathname: string, view: (rootQuery:string) => Block, props: Record<string, string>) {
    console.log('constructor Route pathname', pathname);

    this._pathname = pathname;
    this._blockInit = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string): void {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave(): void {
    // if (this._block) {
    //   this._block.hide();
    // }
    this._block = null;
    const root = document.querySelector(this._props.rootQuery);
    if (root) {
      root.textContent = '';
    }
  }

  match(pathname: string): boolean {
    console.log('---match pathname', pathname);
    console.log('---match this._pathname', this._pathname);
    return isEqual(pathname, this._pathname);
  }

  render(): void {
    // console.log('route render this._block', this._block);

    if (!this._block) {
      this._block = this._blockInit(this._props.rootQuery);
      // this._block = initProfilePage();
      console.log('render this._block', this._block);

      // render(this._props.rootQuery, this._block);
      return;
    }

    this._block.show();
  }
}

function isEqual(lhs, rhs) {
  return lhs === rhs;
}

function render(query, block) {
  console.log('render block', block);

  const root = document.querySelector(query);
  root.textContent = block.getWrapperElement();
  return root;
}
