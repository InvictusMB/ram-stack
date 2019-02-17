import {PickInjectedDependencies} from '@ram-stack/context';
import React from 'react';

export const AppView = ({Shell, sessionStore}: AppViewProps) => {
  return (
    <div>
      <Shell.ProfilePage />
      <Shell.AppStateView />
      <Shell.Button onClick={() => sessionStore.login({})}>login</Shell.Button>
      <Shell.Button onClick={() => sessionStore.logout()}>logout</Shell.Button>
    </div>
  );
};

type AppViewProps = PickInjectedDependencies<'Shell' | 'sessionStore'>;
