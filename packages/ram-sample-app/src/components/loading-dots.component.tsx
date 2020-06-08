import {hooks} from '@ram-stack/core';

export function LoadingDots() {
  const [dots, setDots] = hooks.useState(0);
  const refreshInterval = 300;

  function next(v) {
    return (v + 1) % 4;
  }

  hooks.useEffect(() => {
    const interval = window.setInterval(() => {
      setDots(next(dots));
    }, refreshInterval);

    return () => {
      window.clearInterval(interval);
    };
  });

  return (<>{Array(dots).fill('.').join('')}</>);
}
