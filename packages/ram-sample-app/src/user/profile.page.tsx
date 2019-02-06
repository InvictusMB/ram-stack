import _ from 'lodash';
import React from 'react';

export const ProfilePage = ({Shell, userProfileStore}) => (
  <div>
    <h1>Hello {_.get(userProfileStore, 'userProfile.name', 'Unknown')}!</h1>
    <Shell.Button onClick={() => userProfileStore.load()}>getUserProfile</Shell.Button>
  </div>
);
