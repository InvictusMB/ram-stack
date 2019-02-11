declare module '@ram-stack/context' {
  export type PickInjectedDependencies<K> = Pick<InjectedDependencies, K>;

  type InferProps<C> = C extends import('react').ComponentType<infer P> ? P : never;
  // Omit taken from https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html
  type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

  type WrappedComponent<T> = import('react').ComponentClass<Omit<InferProps<T>, keyof InjectedDependencies>, any>;

  export type InjectedDependencies = {
    apiService: import('./api.service').ApiService;
    appStore: import('./app/app.store').AppStore;
    sessionStore: import('./user/session.store').SessionStore;
    userProfileStore: import('./user/userProfile.store').UserProfileStore;
    Shell: Shell;
  };

  type Shell = {
    AppView: WrappedComponent<typeof import('./app/app.view').AppView>;
    AppStateView: WrappedComponent<typeof import('./app/app-state.view').AppStateView>;
    Button: WrappedComponent<typeof import('./components/button.component').Button>;
    ProfilePage: WrappedComponent<typeof import('./user/profile.page').ProfilePage>;
  };
}
