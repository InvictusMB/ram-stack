import * as awilix from 'awilix';
import {observer} from 'mobx-react';

import {container} from '../di';
import {withContainer} from '../withContainer';

import {UserProfileStore} from './profile';
import {ProfilePage} from './profile.page';
import {SessionStore} from './session';

container.register({
  ProfilePage: awilix.asValue(withContainer(observer(ProfilePage))),
  sessionStore: awilix.asClass(SessionStore).singleton(),
  userProfileStore: awilix.asClass(UserProfileStore).singleton(),
});

export * from './profile';
export * from './session';
