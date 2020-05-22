import {registerModule} from '@ram-stack/composition-root/macro';
import {asClass, asValue, createContainer} from '@ram-stack/core';
import React from 'react';
import {render} from 'react-dom';
import {createInjector} from './with-container';

import './style.css';

const container = createContainer();

const withContainer = createInjector(container);

registerModule({
  asClass,
  asValue,
  container,
  withContainer,
}, '.');

const AppView = container.resolve('AppView') as any;
const CreateScope = container.resolve('CreateScope') as any;

render((
  <div>
    <CreateScope>
      <h2>App 1</h2>
      <AppView />
    </CreateScope>
    <CreateScope>
      <h2>App 2</h2>
      <AppView />
    </CreateScope>
  </div>
), document.getElementById('root'));

