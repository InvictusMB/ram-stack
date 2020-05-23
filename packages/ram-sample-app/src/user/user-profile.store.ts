import {computed, observable, reaction, task} from '@ram-stack/core';

interface UserProfile {
  name: string;
}

export class UserProfileStore {
  static dependencies = [
    Injected.apiService,
    Injected.sessionStore,
  ];

  readonly apiService: Injected.classes.ApiService;
  readonly sessionStore: Injected.classes.SessionStore;
  readonly loginReaction;
  @observable userProfile: UserProfile = null;

  load = task.resolved(async () => {
    this.userProfile = await this.apiService.getUserProfile();
  }, {swallow: true});

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
      this.load.pending || this.sessionStore.isFetching
    );
  }

  reset() {
    this.userProfile = null;
    this.load.reset();
  }
}

type UserProfileStoreDependencies = PickInjected<typeof UserProfileStore.dependencies>;
