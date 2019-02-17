import {PickInjectedDependencies} from '@ram-stack/context';
import {computed, observable, task} from '@ram-stack/core';

interface Session {
  isLoggedIn: boolean;
}

export class SessionStore {
  apiService: SessionStoreDependencies['apiService'];
  @observable session: Session;

  login = task.resolved(async (credentials: any) => {
    this.session = await this.apiService.login(credentials);
  });

  logout = task.resolved(async () => {
    this.session = await this.apiService.logout();
  });

  constructor({apiService}: SessionStoreDependencies) {
    this.apiService = apiService;
  }

  @computed get isFetching() {
    return (
      this.login.pending
      || this.logout.pending
    );
  }

  @computed get isLoggedIn() {
    return (
      !!this.session
      && this.session.isLoggedIn
    );
  }
}

type SessionStoreDependencies = PickInjectedDependencies<'apiService'>;
