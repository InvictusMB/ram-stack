export {asClass, asValue, asFunction} from 'awilix';
export * from 'mobx';
export * from 'mobx-react-lite';
export {task} from 'mobx-task';

export {createCompositionRoot} from './composition-root';
export type {Container} from './composition-root';

export type {default as React} from 'react';
export * as hooks from './hooks';
export * as view from './view';

import 'mobx-react-lite/batchingForReactDom';
