import {PickInjectedDependencies} from '@ram-stack/context';
import React from 'react';

export const AppView = ({Shell, appStore}: AppViewProps) => {
  return (
    <div>
      <Shell.ProfilePage />
      <Shell.AppStateView />
      <Shell.Button onClick={() => appStore.login({})}>login</Shell.Button>
      <Shell.Button onClick={() => appStore.logout()}>logout</Shell.Button>
    </div>
  );
};

type AppViewProps = PickInjectedDependencies<'Shell' | 'appStore'>;
