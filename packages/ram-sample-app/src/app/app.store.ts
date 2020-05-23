import {computed} from '@ram-stack/core';

export class AppStore {
  static dependencies = [
    Injected.userProfileStore,
    Injected.sessionStore,
  ];

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

type AppStoreDependencies = PickInjected<typeof AppStore.dependencies>;
