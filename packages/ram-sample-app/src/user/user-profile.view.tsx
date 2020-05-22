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

const dependencies = [
  Injected.Shell,
  Injected.userProfileStore,
];
Object.assign(UserProfileView, {dependencies});
type UserProfileViewProps = PickInjected<typeof dependencies>;

function getName(userProfile) {
  return (userProfile && userProfile.name) || 'Anonymous';
}
