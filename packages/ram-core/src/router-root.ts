import {observable} from './observable';

export function createRouterRoot() {
  return new RouterRoot();
}

export class RouterRoot {
  index = {} as ComponentMap;
  @observable
  routeConfig = {} as RouteMap;
  consolePrefix = `[@ram/core/router-root]`;

  load(registrations: Registration[] = []) {
    const routes = registrations.map(r => {
      const [registrationId, module, filePath, sourceId] = r;
      const exported = this.validateExport(filePath, module, sourceId);
      if (!exported) {
        return [];
      }
      const route = this.validateRoute(exported);
      if (!route) {
        return [];
      }
      return [route, sourceId];
    });
    Object.assign(this.routeConfig, Object.fromEntries(routes));
    return this;
  }

  reload(registrations: Registration[]) {
    return this.load(registrations);
  }

  validateRoute(component: ComponentWithRoute) {
    const {route} = component;
    const normalized = this.normalize(route);
    if (!this.index[normalized]) {
      this.index[normalized] = component;
      return route;
    }
    console.log(normalized);
    console.warn('Duplicated route found:', route, '\ncomponent1:', this.index[normalized], '\ncomponent2:', component);
  }

  validateExport(filePath: string, module: Module, sourceId: string) {
    if (!module) {
      console.error(`${this.consolePrefix} Module "${filePath}" not found`);
      return null;
    }
    const exported = module[sourceId];
    if (!exported) {
      console.error(`${this.consolePrefix} ${sourceId} not found in module "${filePath}"`);
      return null;
    }
    return exported;
  }

  normalize(route: string) {
    return route.replace(/:\w+/g, '{{0}}');
  }

}

type RouteMap = {[componentId: string]: string};
type ComponentMap = {[route: string]: ComponentWithRoute};
type ComponentWithRoute = {route: string};

type Registration = [RegistrationId, Module, FilePath, SourceId, ApplyModifiersFn];
type RegistrationId = string;
type Module = any;
type FilePath = any;
type SourceId = string;
type ApplyModifiersFn = (v: any) => any
