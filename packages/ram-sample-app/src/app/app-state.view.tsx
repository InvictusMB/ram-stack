import {toJS} from 'mobx';
import {observer} from 'mobx-react';
import React, {Component} from 'react';

@observer
export class AppStateView extends Component<{appStore}> {

  render() {
    const {appStore} = this.props;
    return (
      <div>
        <pre>AppStore: {JSON.stringify(toJS(appStore), null, 2)}</pre>
        <div>AppStore.isFetching: {JSON.stringify(appStore.isFetching)}</div>
        <div>Login status: {JSON.stringify(appStore.sessionStore.login.state)}</div>
        <div>User profile status: {JSON.stringify(appStore.userProfileStore.load.state)}</div>
      </div>
    );
  }
}
