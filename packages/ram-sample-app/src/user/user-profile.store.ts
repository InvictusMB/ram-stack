import {computed, observable, reaction, task} from '@ram-stack/core';

interface UserProfile {
  name: string;
}

export class UserProfileStore {
  readonly apiService: Injected.classes.ApiService;
  readonly sessionStore: Injected.classes.SessionStore;
  readonly loginReaction;
  @observable userProfile: UserProfile = null;

  load = task(async () => {
    this.userProfile = await this.apiService.getUserProfile();
  });

  constructor({apiService, sessionStore}: UserProfileStoreDependencies) {
    this.apiService = apiService;
    this.sessionStore = sessionStore;

    this.loginReaction = reaction(
      () => sessionStore.isLoggedIn,
      (isLoggedIn) => {
        if (isLoggedIn) {
          this.load();
        } else {
          this.reset();
        }
      },
      {fireImmediately: true},
    );
  }

  @computed get isFetching() {
    return (
      this.load.pending
    );
  }

  reset() {
    this.userProfile = null;
  }
}

const dependencies = [
  Injected.apiService,
  Injected.sessionStore,
];
type UserProfileStoreDependencies = PickInjected<typeof dependencies>;
