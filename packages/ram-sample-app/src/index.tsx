import * as awilix from 'awilix';
import {observer} from 'mobx-react';
import React from 'react';
import {render} from 'react-dom';
// @ts-ignore
import {registerModule} from '../macros/di-resolver.macro';
import {withContainer} from './withContainer';

import './style.css';

export const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
});

registerModule({container, withContainer, awilix, observer}, '.');

const AppView = container.resolve('AppView') as any;

render(<AppView />, document.getElementById('root'));
