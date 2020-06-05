import {hooks} from '@ram-stack/core';

export function CreateScope({ContainerContext, children}: BranchStateProps) {
  const shell = hooks.useContext(ContainerContext);
  const [childScope] = hooks.useState(shell.createScope());
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
