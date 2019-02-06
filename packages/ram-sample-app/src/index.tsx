import React from 'react';
import {render} from 'react-dom';

import {Shell} from './di';

import './app';
import './components';
import './style.css';
import './user';

render(<Shell.AppView />, document.getElementById('root'));
