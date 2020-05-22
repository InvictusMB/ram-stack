import React from 'react';

export function CreateScope({ContainerContext, children}: BranchStateProps) {
  const shell = React.useContext(ContainerContext);
  const [childScope] = React.useState(shell.createScope());
  return (
    <ContainerContext.Provider value={childScope}>
      {children}
    </ContainerContext.Provider>
  );
}

CreateScope.dependencies = [
  Injected.ContainerContext,
];
type BranchStateProps = PickInjected<typeof CreateScope.dependencies> & {
  children: React.ReactNode
};
