import {computed, observable} from 'mobx';
import {task} from 'mobx-task';
import {SessionStore, UserProfileStore} from '../user';

export class AppStore {
  @observable userProfileStore: UserProfileStore;
  @observable sessionStore: SessionStore;

  constructor({sessionStore, userProfileStore}) {
    this.userProfileStore = userProfileStore;
    this.sessionStore = sessionStore;
  }

  @computed get isFetching() {
    return (
      this.sessionStore.isFetching
      || this.userProfileStore.isFetching
    );
  }

  @task.resolved
  async login(credentials) {
    await this.sessionStore.login(credentials);
    await this.userProfileStore.load();
  }

  @task.resolved
  async logout() {
    await this.sessionStore.logout();
    await this.userProfileStore.reset();
  }
}
