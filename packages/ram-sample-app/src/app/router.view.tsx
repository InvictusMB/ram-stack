import {router} from '@ram-stack/core';

export function RouterView({Shell, routerRoot}: PickInjected<typeof RouterView.dependencies>) {
  return (
    <router.BrowserRouter>
      <router.Switch>
        {Object.entries(routerRoot.routeConfig)
          .map(([path, id]) => {
            return ([path, Shell[id as keyof typeof Shell]]);
          })
          .map(([path, Component]) => (
            <router.Route {...{
              key: path as string,
              path: path as string,
              exact: true,
              render: (props: any) => <Component {...props} />,
            }} />
          ))}
      </router.Switch>
    </router.BrowserRouter>
  );
}

RouterView.dependencies = [
  Injected.Shell,
  Injected.routerRoot,
];
