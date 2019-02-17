import {PickInjectedDependencies} from '@ram-stack/context';
import {computed, observable, reaction, task} from '@ram-stack/core';

interface UserProfile {
  name: string;
}

export class UserProfileStore {
  readonly apiService: UserProfileStoreDependencies['apiService'];
  readonly sessionStore: UserProfileStoreDependencies['sessionStore'];
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

type UserProfileStoreDependencies = PickInjectedDependencies<'apiService' | 'sessionStore'>;
