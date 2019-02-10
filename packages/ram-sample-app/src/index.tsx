import {registerModule} from '@ram-stack/composition-root/macro';
import * as awilix from 'awilix';
import {asClass, asValue} from 'awilix';
import {observer} from 'mobx-react';
import React from 'react';
import {render} from 'react-dom';
import {createInjector} from './withContainer';

import './style.css';

export const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
});

const withContainer = createInjector(container);

registerModule({
  asClass,
  asValue,
  container,
  observer,
  withContainer,
}, '.');

const AppView = container.resolve('AppView') as any;

render(<AppView />, document.getElementById('root'));
