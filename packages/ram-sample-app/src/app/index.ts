import * as awilix from 'awilix';
import {container} from '../di';
import {withContainer} from '../withContainer';

import {AppStateView} from './app-state.view';
import {AppStore} from './app.store';

container.register({
  AppStateView: awilix.asValue(withContainer(AppStateView)),
  appStore: awilix.asClass(AppStore).singleton(),
});
