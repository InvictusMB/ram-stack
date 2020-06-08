export function UserGreetingPage({Shell}: UserGreetingPageProps) {
  return (
    <Shell.UserGreetingView />
  );
}

UserGreetingPage.route = '/hello';
UserGreetingPage.dependencies = [
  Injected.Shell,
];
type UserGreetingPageProps = PickInjected<typeof UserGreetingPage.dependencies>;
