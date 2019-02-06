import * as awilix from 'awilix';
import {observer} from 'mobx-react';

import {container} from '../di';
import {withContainer} from '../withContainer';

import {AppStateView} from './app-state.view';
import {AppStore} from './app.store';
import { AppView } from './app.view';

container.register({
  AppStateView: awilix.asValue(withContainer(observer(AppStateView))),
  AppView: awilix.asValue(withContainer(observer(AppView))),
  appStore: awilix.asClass(AppStore).singleton(),
});
