import * as awilix from 'awilix';

export const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
});

export const Shell = container.cradle as any;
