import type {InjectedDependencies} from '@ram-stack/context';
import {registerModule} from '@ram-stack/composition-root/macro';
import {createCompositionRoot, di, view} from '@ram-stack/core';

import './ram-context';
import './style.css';

const {asClass, asValue} = di;
const root = createCompositionRoot<InjectedDependencies>({
  onReady: renderApp,
});
const withInjected = root.withInjected;

registerModule({
  asClass,
  asValue,
  root,
  withInjected,
}, '.');

function renderApp() {
  const Shell = root.container.resolve('Shell');

  view.renderDom((
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
  ), document.getElementById('root'));
}
