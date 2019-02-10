import {computed, task} from '@ram-stack/core';
import {SessionStore, UserProfileStore} from '../user';

export class AppStore {
  userProfileStore: UserProfileStore;
  sessionStore: SessionStore;

  login = task(async (credentials: any) => {
    await this.sessionStore.login(credentials);
    await this.userProfileStore.load();
  });

  logout = task.resolved(async () => {
    await this.sessionStore.logout();
    await this.userProfileStore.reset();
  });

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
}
