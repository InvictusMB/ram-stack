import {computed, observable} from 'mobx';
import {task} from 'mobx-task';
import {login, logout} from '../service';

interface Session {
  isLoggedIn: boolean;
}

export class SessionStore {
  @observable session: Session;

  @computed get isFetching() {
    return (
      // @ts-ignore
      this.login.pending
      // @ts-ignore
      || this.logout.pending
    );
  }

  @task.resolved
  async login(credentials) {
    this.session = await login(credentials);
  }

  @task.resolved
  async logout() {
    this.session = await logout();
  }
}
