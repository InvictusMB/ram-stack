import {Page} from '@ram-stack/context';
import {router} from '@ram-stack/core';

export function NavigationView({Shell, routerRoot}: PickInjected<typeof NavigationView.dependencies>) {
  return (
    <div>
      {Object.entries(routerRoot.routeConfig)
        .map(([path, id]) => {
          return ([path, Shell[id as keyof typeof Shell]]);
        })
        .map(([path, Component], i) => {
          const route = (Component as Page).route;
          return (
            <router.Link key={i} to={route.replace(/:\w+/g, '1')}>
              <span>[{route}]</span>
            </router.Link>
          );
        })
      }
    </div>
  );
}

NavigationView.dependencies = [
  Injected.Shell,
  Injected.routerRoot,
];
