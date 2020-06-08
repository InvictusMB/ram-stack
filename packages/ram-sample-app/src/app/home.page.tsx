import {router} from '@ram-stack/core';

export function HomePage({Shell}: HomePageProps) {
  return (
    <router.Redirect to={Shell.UserGreetingPage.route} />
  );
}

HomePage.route = '/';
HomePage.dependencies = [
  Injected.Shell,
];
type HomePageProps = PickInjected<typeof HomePage.dependencies>;
