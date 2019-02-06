import {computed, observable} from 'mobx';
import {task} from 'mobx-task';

interface UserProfile {
  name: string;
}

export class UserProfileStore {
  apiService;
  @observable userProfile: UserProfile = null;

  constructor({apiService}) {
    this.apiService = apiService;
  }

  @computed get isFetching() {
    return (
      // @ts-ignore
      this.load.pending
    );
  }

  @task.resolved
  async load() {
    this.userProfile = await this.apiService.getUserProfile();
  }

  reset() {
    this.userProfile = null;
  }
}
