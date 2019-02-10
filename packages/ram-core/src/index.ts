// tslint:disable-next-line
/// <reference path="../mobx-task.d.ts" />
export {asClass, asValue, asFunction} from 'awilix';
export * from 'mobx';
export * from 'mobx-react';
export {task} from 'mobx-task';

import {createContainer as createAwilixContainer, InjectionMode} from 'awilix';

export function createContainer() {
  return createAwilixContainer({
    injectionMode: InjectionMode.PROXY,
  });
}
