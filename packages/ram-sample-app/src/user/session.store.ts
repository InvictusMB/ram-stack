import {computed, observable} from 'mobx';
import {task} from 'mobx-task';

interface Session {
  isLoggedIn: boolean;
}

export class SessionStore {
  apiService;
  @observable session: Session;

  constructor({apiService}) {
    this.apiService = apiService;
  }

  @computed get isFetching() {
    return (
      // @ts-ignore
      this.login.pending
      // @ts-ignore
      || this.logout.pending
    );
  }

  @task.resolved
  async login(credentials) {
    this.session = await this.apiService.login(credentials);
  }

  @task.resolved
  async logout() {
    this.session = await this.apiService.logout();
  }
}
