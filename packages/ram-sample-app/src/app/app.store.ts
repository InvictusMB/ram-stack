import {computed} from '@ram-stack/core';

export class AppStore {
  userProfileStore: Injected.classes.UserProfileStore;
  sessionStore: Injected.classes.SessionStore;

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

const dependencies = [
  Injected.userProfileStore,
  Injected.sessionStore,
];
type AppStoreDependencies = PickInjected<typeof dependencies>;
