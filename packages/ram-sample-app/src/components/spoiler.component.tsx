import React from 'react';

export function Spoiler({Shell, name, children}: SpoilerProps) {
  const [expanded, setExpanded] = React.useState(false);
  return (
    <div>
      <div>
        <Shell.Button {...{
          onClick: () => setExpanded(!expanded),
        }}>
          {expanded ? 'Hide' : 'Show'} {name ?? 'spoiler'}
        </Shell.Button>
      </div>
      {expanded && children}
    </div>
  );
}

Spoiler.dependencies = [
  Injected.Shell,
];
type SpoilerProps = PickInjected<typeof Spoiler.dependencies> & {
  name?: string,
  children: React.ReactNode
};
