export {asClass, asValue, asFunction, AwilixContainer as Container} from 'awilix';
export * from 'mobx';
export * from 'mobx-react-lite';
export {task} from 'mobx-task';

import {createContainer as createAwilixContainer, InjectionMode} from 'awilix';

export function createContainer() {
  return createAwilixContainer({
    injectionMode: InjectionMode.PROXY,
  });
}
