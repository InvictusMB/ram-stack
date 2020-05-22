import React from 'react';

export const AppView = ({Shell, sessionStore}: AppViewProps) => {
  return (
    <div>
      <Shell.UserProfileView />
      <Shell.AppStateView />
      <Shell.Button onClick={() => sessionStore.login({name: 'World'})}>login</Shell.Button>
      <Shell.Button onClick={() => sessionStore.logout()}>logout</Shell.Button>
    </div>
  );
};

const dependencies = [
  Injected.Shell,
  Injected.userProfileStore,
  Injected.sessionStore,
];
Object.assign(AppView, {dependencies});
type AppViewProps = PickInjected<typeof dependencies>;
