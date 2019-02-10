import {registerModule} from '@ram-stack/composition-root/macro';
import {asClass, asValue, createContainer, observer} from '@ram-stack/core';
import React from 'react';
import {render} from 'react-dom';
import {createInjector} from './withContainer';

import './style.css';

const container = createContainer();

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
