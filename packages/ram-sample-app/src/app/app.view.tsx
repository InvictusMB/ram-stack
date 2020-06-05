export function AppView({Shell, sessionStore}: AppViewProps) {
  return (
    <div>
      <Shell.UserProfileView />
      <Shell.AppStateView />
      <Shell.Button onClick={() => sessionStore.login({name: 'World'})}>login</Shell.Button>
      <Shell.Button onClick={() => sessionStore.logout()}>logout</Shell.Button>
    </div>
  );
}

AppView.dependencies = [
  Injected.Shell,
  Injected.userProfileStore,
  Injected.sessionStore,
];
type AppViewProps = PickInjected<typeof AppView.dependencies>;
