import {toJS} from '@ram-stack/core';
import React from 'react';

export function AppStateView({Shell, appStore}: AppStateViewProps) {
  return (
    <div>
      <div>AppStore.isFetching: {JSON.stringify(appStore.isFetching)}</div>
      <div>Login status: {JSON.stringify(appStore.sessionStore.login.state)}</div>
      <div>User profile status: {JSON.stringify(appStore.userProfileStore.load.state)}</div>
      <Shell.Spoiler name="App state">
        <pre>AppStore: {JSON.stringify(toJS(appStore), null, 2)}</pre>
      </Shell.Spoiler>
    </div>
  );
}

const dependencies = [
  Injected.Shell,
  Injected.appStore,
];
Object.assign(AppStateView, {dependencies});
type AppStateViewProps = PickInjected<typeof dependencies>;
