export function UserProfileView(props: UserProfileViewProps) {
  const {Shell, userProfileStore} = props;
  const error = userProfileStore.load.error as Error;
  return (
    <div>
      {userProfileStore.isFetching && <Shell.ProgressIndicator />}
      {!userProfileStore.isFetching && <h3>Helloss {getName(userProfileStore)}!</h3>}
      {error && (
        <div>
          <b>Error:</b> <i>{error.message}!</i>
        </div>
      )}
      <Shell.Button onClick={() => userProfileStore.load()}>
        getUserProfile
      </Shell.Button>
    </div>
  );
}

UserProfileView.dependencies = [
  Injected.Shell,
  Injected.userProfileStore,
];
type UserProfileViewProps = PickInjected<typeof UserProfileView.dependencies>;

function getName(store: Injected.classes.UserProfileStore) {
  if (store.load.error) {
    return 'Error';
  }
  return store.userProfile?.name || 'Anonymous';
}
