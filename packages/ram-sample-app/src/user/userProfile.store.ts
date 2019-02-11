import {PickInjectedDependencies} from '@ram-stack/context';
import {computed, observable, task} from '@ram-stack/core';

interface UserProfile {
  name: string;
}

export class UserProfileStore {
  apiService: UserProfileStoreDependencies['apiService'];
  @observable userProfile: UserProfile = null;

  load = task(async () => {
    this.userProfile = await this.apiService.getUserProfile();
  });

  constructor({apiService}: UserProfileStoreDependencies) {
    this.apiService = apiService;
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

type UserProfileStoreDependencies = PickInjectedDependencies<'apiService'>;
