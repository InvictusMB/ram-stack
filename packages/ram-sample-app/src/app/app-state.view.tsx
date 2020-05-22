import {toJS} from '@ram-stack/core';
import React from 'react';

export function AppStateView({appStore}: AppStateViewProps) {
  return (
    <div>
      <pre>AppStore: {JSON.stringify(toJS(appStore), null, 2)}</pre>
      <div>AppStore.isFetching: {JSON.stringify(appStore.isFetching)}</div>
      <div>Login status: {JSON.stringify(appStore.sessionStore.login.state)}</div>
      <div>User profile status: {JSON.stringify(appStore.userProfileStore.load.state)}</div>
    </div>
  );
}

const dependencies = [
  Injected.appStore,
];
Object.assign(AppStateView, {dependencies});
type AppStateViewProps = PickInjected<typeof dependencies>;
