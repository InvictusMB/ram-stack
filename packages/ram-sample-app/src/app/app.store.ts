import {PickInjectedDependencies} from '@ram-stack/context';
import {computed} from '@ram-stack/core';

export class AppStore {
  userProfileStore: AppStoreDependencies['userProfileStore'];
  sessionStore: AppStoreDependencies['sessionStore'];

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
