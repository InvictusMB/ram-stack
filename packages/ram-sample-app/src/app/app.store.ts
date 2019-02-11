import {PickInjectedDependencies} from '@ram-stack/context';
import {computed, task} from '@ram-stack/core';

export class AppStore {
  userProfileStore: AppStoreDependencies['userProfileStore'];
  sessionStore: AppStoreDependencies['sessionStore'];

  login = task(async (credentials: any) => {
    await this.sessionStore.login(credentials);
    await this.userProfileStore.load();
  });

  logout = task.resolved(async () => {
    await this.sessionStore.logout();
    await this.userProfileStore.reset();
  });

  constructor({sessionStore, userProfileStore}: AppStoreDependencies) {
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

type AppStoreDependencies = PickInjectedDependencies<'userProfileStore' | 'sessionStore'>;
