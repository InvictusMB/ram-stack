import React from 'react';

export function UserProfileView(props: UserProfileViewProps) {
  const {Shell, userProfileStore} = props;
  return (
    <div>
      <h3>Hello {getName(userProfileStore.userProfile)}!</h3>
      <Shell.Button onClick={() => userProfileStore.load()}>
        getUserProfile
      </Shell.Button>
    </div>
  );
}

UserProfileView.dependencies = [
  Injected.Shell,
  Injected.userProfileStore,
];
type UserProfileViewProps = PickInjected<typeof UserProfileView.dependencies>;

function getName(userProfile) {
  return (userProfile && userProfile.name) || 'Anonymous';
}
