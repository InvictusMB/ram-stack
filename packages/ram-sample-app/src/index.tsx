import React from 'react';
import {render} from 'react-dom';
// @ts-ignore
import {registerModule} from '../macros/di-resolver.macro';

import {container, Shell} from './di';

import './style.css';

// TODO: Pass withContainer to resolver
import {withContainer} from './withContainer';
// tslint:disable-next-line
+withContainer;

registerModule(container, '.');

render(<Shell.AppView />, document.getElementById('root'));
