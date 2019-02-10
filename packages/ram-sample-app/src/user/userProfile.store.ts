import {computed, observable, task} from '@ram-stack/core';

interface UserProfile {
  name: string;
}

export class UserProfileStore {
  apiService;
  @observable userProfile: UserProfile = null;

  load = task(async () => {
    this.userProfile = await this.apiService.getUserProfile();
  });

  constructor({apiService}) {
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
