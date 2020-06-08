import {hooks} from '@ram-stack/core';

export function UserProfilePage(props: UserProfilePageProps) {
  const {id} = hooks.useParams<{id: string}>();
  return (
    <h3>
      User {id} details
    </h3>
  );
}

UserProfilePage.route = '/user/:id';
UserProfilePage.dependencies = [];
type UserProfilePageProps = PickInjected<typeof UserProfilePage.dependencies>;
