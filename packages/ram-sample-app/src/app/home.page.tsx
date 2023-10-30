import {hooks, router} from '@ram-stack/core';

export function HomePage({Shell}: HomePageProps) {
  const [redirect, setRedirect] = hooks.useState(false);
  const redirectTimeout = 5000;

  hooks.useEffect(() => {
    const timeout = window.setTimeout(() => {
      setRedirect(true);
    }, redirectTimeout);

    return () => {
      window.clearTimeout(timeout);
    };
  });

  if (redirect) {
    return (
      <router.Navigate to={Shell.UserGreetingPage.route} />
    );
  }
  return (
    <h3>
      This page will redirect in 5 seconds
      <Shell.LoadingDots />
    </h3>
  );
}

HomePage.route = '/';
HomePage.dependencies = [
  Injected.Shell,
];
type HomePageProps = PickInjected<typeof HomePage.dependencies>;
