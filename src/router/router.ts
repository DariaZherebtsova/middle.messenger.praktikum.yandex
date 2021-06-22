import Route from './route';
import { Block } from '../components/block/block';

class Router {
  routes: Route[];

  history: History;

  _currentRoute: Route;

  _rootQuery: string;

  static __instance: Router;

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  use(pathname:string, block: (rootQuery:string) => Block): Router {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });

    this.routes.push(route);

    return this;
  }

  start(): void {
    console.log('start window.location.pathname', window.location.pathname);
    window.onpopstate = (event => {
      console.log('----------onpopstate----------', event.currentTarget.location.pathname);
      this._onRoute(event.currentTarget.location.pathname);
    }).bind(this);

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname:string): void {
    console.log('_onRoute pathname', pathname);

    const route = this.getRoute(pathname);

    if (!route) {
      return;
    }

    console.log('---_currentRoute', this._currentRoute);
    
    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    // route.render(route, pathname);
    route.render();
  }

  go(pathname: string): void {
    console.log('--go');
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back(): void {
    this.history.back();
  }

  forward(): void {
    this.history.forward();
  }

  getRoute(pathname: string): Route {
    console.log('---getRoute');
    return this.routes.find(route => route.match(pathname));
  }
}

export const router = new Router('#root');
