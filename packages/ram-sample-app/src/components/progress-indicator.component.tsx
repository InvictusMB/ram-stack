export function ProgressIndicator({Shell}: ProgressIndicatorProps) {
  return (
    <h3>
      Fetching
      <Shell.LoadingDots />
    </h3>
  );
}

ProgressIndicator.dependencies = [
  Injected.Shell,
];
type ProgressIndicatorProps = PickInjected<typeof ProgressIndicator.dependencies>;
