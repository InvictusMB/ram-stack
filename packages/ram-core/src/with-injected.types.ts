import type {default as React} from 'react';

type InferProps<C> = C extends React.ComponentType<infer P> ? P : never;
type OwnKeys<T, K> = Extract<K, keyof T>;
// WithOptional inspired by https://github.com/Microsoft/TypeScript/issues/25760#issuecomment-405931434
type WithOptional<T, K> = Omit<T, OwnKeys<T, K>> & Partial<Pick<T, OwnKeys<T, K>>>;
type ComponentWithDependencies<Injected, T> = import('react').FunctionComponent<T> & {
  dependencies: readonly (keyof Injected)[]
}
type ComponentDependencies<T> = T extends {dependencies: infer U} ? U : never;

export type WithInjected<Injected, T> = T extends ComponentWithDependencies<Injected, infer U>
  ? import('react').FunctionComponent<WithOptional<InferProps<T>, ComponentDependencies<T>[number]>>
  : T;
