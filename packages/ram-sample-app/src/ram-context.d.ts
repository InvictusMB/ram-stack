/* This file was automatically generated by template-emitter plugin */
/* See composition-config in ./src/ */

type PickInjected<K> = import('@ram-stack/context').PickInjected<K>;

namespace Injected {
  export const ApiService = 'ApiService' as const;
  export const AppStore = 'AppStore' as const;
  export const SessionStore = 'SessionStore' as const;
  export const UserProfileStore = 'UserProfileStore' as const;
  export const apiService = 'apiService' as const;
  export const appStore = 'appStore' as const;
  export const sessionStore = 'sessionStore' as const;
  export const userProfileStore = 'userProfileStore' as const;
  export const Shell = 'Shell' as const;
  export const ContainerContext = 'ContainerContext' as const;

  namespace classes {
    export * from '@ram-stack/context/classes';
  }
}

declare module '@ram-stack/context/classes' {
  type ApiService = import('./api.service').ApiService;
  type AppStore = import('./app/app.store').AppStore;
  type SessionStore = import('./user/session.store').SessionStore;
  type UserProfileStore = import('./user/user-profile.store').UserProfileStore;
}

declare module '@ram-stack/context' {
  type PickInjected<K extends (keyof InjectedDependencies)[]> = Pick<InjectedDependencies, K[number]>

  type InferProps<C> = C extends import('react').ComponentType<infer P> ? P : never;
  type OwnKeys<T, K> = Extract<K, keyof T>;
  // WithOptional inspired by https://github.com/Microsoft/TypeScript/issues/25760#issuecomment-405931434
  type WithOptional<T, K> = Omit<T, OwnKeys<T, K>> & Partial<Pick<T, OwnKeys<T, K>>>;
  type ComponentWithDependencies<T> = import('react').FunctionComponent<T> & {
    dependencies: readonly (keyof InjectedDependencies)[]
  }
  type ComponentDependencies<T> = T extends {dependencies: infer U} ? U : never;

  type WrappedComponent<T> = T extends ComponentWithDependencies<infer U>
    ? import('react').FunctionComponent<WithOptional<InferProps<T>, ComponentDependencies<T>[number]>>
    : T;

  type InjectedDependencies = {
    ApiService: typeof import('./api.service').ApiService,
    AppStore: typeof import('./app/app.store').AppStore,
    SessionStore: typeof import('./user/session.store').SessionStore,
    UserProfileStore: typeof import('./user/user-profile.store').UserProfileStore,
    apiService: import('./api.service').ApiService,
    appStore: import('./app/app.store').AppStore,
    sessionStore: import('./user/session.store').SessionStore,
    userProfileStore: import('./user/user-profile.store').UserProfileStore,
    Shell: Shell,
    ContainerContext: React.Context<import('@ram-stack/core').Container<InjectedDependencies>>,
  };

  type Shell = {
    AppStateView: WrappedComponent<typeof import('./app/app-state.view').AppStateView>,
    AppView: WrappedComponent<typeof import('./app/app.view').AppView>,
    Button: WrappedComponent<typeof import('./components/button.component').Button>,
    CreateScope: WrappedComponent<typeof import('./components/create-scope.component').CreateScope>,
    Spoiler: WrappedComponent<typeof import('./components/spoiler.component').Spoiler>,
    UserProfileView: WrappedComponent<typeof import('./user/user-profile.view').UserProfileView>,
  };
}
