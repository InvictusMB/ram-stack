import type {InjectedDependencies} from '@ram-stack/context';
import {registerModule} from '@ram-stack/composition-root/macro';
import {createCompositionRoot, createRouterRoot, di, view} from '@ram-stack/core';

import './ram-context';
import './style.css';

const {asClass, asValue} = di;

const renderRoot = view.createRoot(document.getElementById('root'));
const root = createCompositionRoot<InjectedDependencies>({
  onReady: renderApp,
});
const withInjected = root.withInjected;

const router = createRouterRoot();
root.container.register({
  routerRoot: asValue(router),
});

registerModule({
  asClass,
  asValue,
  root,
  withInjected,
  router,
}, '.');

function renderApp() {
  const Shell = root.container.resolve('Shell');

  renderRoot.render(
    <div>
      <div>
        <h2>App 1</h2>
        <Shell.AppView />
      </div>
      <Shell.CreateScope>
        <h2>App 2</h2>
        <Shell.AppView />
      </Shell.CreateScope>
    </div>
  );
}
