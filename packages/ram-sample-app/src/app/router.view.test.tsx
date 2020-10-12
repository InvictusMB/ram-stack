import {render} from '@testing-library/react';

import '../ram-context';

import {RouterView} from './router.view';

test('RouterView renders routes', () => {
  const {getByText} = render(
    <RouterView {...{
      Shell: {
        foo: () => <div>foo</div>,
      } as any,
      routerRoot: {
        routeConfig: {
          '/': 'foo',
        },
      } as any,
    }} />,
  );
  const linkElement = getByText('foo');
  expect(linkElement).toBeInTheDocument();
});
