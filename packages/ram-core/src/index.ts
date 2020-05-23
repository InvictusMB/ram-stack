export {asClass, asValue, asFunction} from 'awilix';
export * from 'mobx';
export * from 'mobx-react-lite';
export {task} from 'mobx-task';

import {
  createContainer as createAwilixContainer,
  InjectionMode,
  AwilixContainer,
  ResolveOptions,
} from 'awilix';

export function createContainer<T extends object>(): Container<T> {
  return createAwilixContainer({
    injectionMode: InjectionMode.PROXY,
  });
}

export type Container<T extends object> = Omit<AwilixContainer<T>, 'resolve'> & {
  resolve<K extends (string | symbol)>(name: K, resolveOptions?: ResolveOptions): K extends keyof T ? T[K] : never;
  resolve<V>(name: string | symbol, resolveOptions?: ResolveOptions): V;
}
