import {router, view} from '@ram-stack/core';

export function RouterView({Shell, routerRoot}: PickInjected<typeof RouterView.dependencies>) {
  return (
    <router.BrowserRouter>
      <Shell.NavigationView />
      <router.Routes>
        {Object.entries(routerRoot.routeConfig)
          .map(([path, id]) => {
            return ([path, Shell[id as keyof typeof Shell]]);
          })
          .map(([path, Component]) => (
            <router.Route {...{
              key: path as string,
              path: path as string,
              exact: true,
              element: view.createElement(Component as any),
            }} />
          ))}
      </router.Routes>
    </router.BrowserRouter>
  );
}

RouterView.dependencies = [
  Injected.Shell,
  Injected.routerRoot,
];
