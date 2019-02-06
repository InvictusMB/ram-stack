import {observer} from 'mobx-react';
import React, {Component} from 'react';
import {render} from 'react-dom';

import {container, Shell} from './di';

import './app';
import './components';
import './style.css';
import './user';

@observer
class App extends Component {

  render() {
    const appStore = container.resolve('appStore') as any;
    return (
      <div>
        <Shell.ProfilePage />
        <Shell.AppStateView />
        <Shell.Button onClick={() => appStore.userProfileStore.load()}>getUserProfile</Shell.Button>
        <Shell.Button onClick={() => appStore.login({})}>login</Shell.Button>
        <Shell.Button onClick={() => appStore.logout()}>logout</Shell.Button>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
