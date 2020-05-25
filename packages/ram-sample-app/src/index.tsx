import type {InjectedDependencies} from '@ram-stack/context';
import {registerModule} from '@ram-stack/composition-root/macro';
import {asClass, asValue, createCompositionRoot} from '@ram-stack/core';
import React from 'react';
import {render} from 'react-dom';
import {createInjector} from './with-container';

import './style.css';

const root = createCompositionRoot<InjectedDependencies>()
const container = root.container;

const withContainer = createInjector(container);

registerModule({
  asClass,
  asValue,
  root,
  withContainer,
}, '.');

const Shell = container.resolve('Shell');

render((
  <div>
    <Shell.CreateScope>
      <h2>App 1</h2>
      <Shell.AppView />
    </Shell.CreateScope>
    <Shell.CreateScope>
      <h2>App 2</h2>
      <Shell.AppView />
    </Shell.CreateScope>
  </div>
), document.getElementById('root'));

