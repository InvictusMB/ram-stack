import React from 'react';

export function UserProfileView(props: UserProfileViewProps) {
  const {Shell, userProfileStore} = props;
  return (
    <div>
      {userProfileStore.isFetching && <Shell.ProgressIndicator />}
      {!userProfileStore.isFetching && <h3>Hello {getName(userProfileStore)}!</h3>}
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

function getName(store: Injected.classes.UserProfileStore) {
  if (store.load.error) {
    return 'Error';
  }
  return store.userProfile?.name || 'Anonymous';
}
