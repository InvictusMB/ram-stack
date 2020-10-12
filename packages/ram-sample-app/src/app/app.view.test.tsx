import {render} from '@testing-library/react';

import '../ram-context';

import {AppView} from './app.view';

test('AppView renders navigation', () => {
  const {getByText} = render(
    <AppView {...{
      Shell: {
        NavigationView: () => <div>navigation</div>,
        RouterView: stub,
        AppStateView: stub,
        Button: stub,
      } as any,
      userProfileStore: {} as any,
      sessionStore: {} as any,
    }} />,
  );
  const element = getByText('navigation');
  expect(element).toBeInTheDocument();
});

test('AppView renders router', () => {
  const {getByText} = render(
    <AppView {...{
      Shell: {
        NavigationView: stub,
        RouterView: () => <div>router</div>,
        AppStateView: stub,
        Button: stub,
      } as any,
      userProfileStore: {} as any,
      sessionStore: {} as any,
    }} />,
  );
  const element = getByText('router');
  expect(element).toBeInTheDocument();
});

test('AppView renders state', () => {
  const {getByText} = render(
    <AppView {...{
      Shell: {
        NavigationView: stub,
        RouterView: stub,
        AppStateView: () => <div>state</div>,
        Button: stub,
      } as any,
      userProfileStore: {} as any,
      sessionStore: {} as any,
    }} />,
  );
  const element = getByText('state');
  expect(element).toBeInTheDocument();
});

function stub() {
  return null;
}
