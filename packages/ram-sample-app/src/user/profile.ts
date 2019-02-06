import {computed, observable} from 'mobx';
import {task} from 'mobx-task';
import {getUserProfile} from '../service';

interface UserProfile {
  name: string;
}

export class UserProfileStore {
  @observable userProfile: UserProfile = null;

  @computed get isFetching() {
    return (
      // @ts-ignore
      this.load.pending
    );
  }

  @task.resolved
  async load() {
    this.userProfile = await getUserProfile();
  }

  reset() {
    this.userProfile = null;
  }
}
