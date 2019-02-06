import _ from 'lodash';
import {observer} from 'mobx-react';
import React from 'react';

export const ProfilePage = observer(({userProfileStore}) =>
  <h1>Hello {_.get(userProfileStore, 'userProfile.name', 'Unknown')}!</h1>);
