import {
  createContainer as createAwilixContainer,
  InjectionMode,
  AwilixContainer,
  ResolveOptions,
} from 'awilix';

export function createCompositionRoot<T extends object>() {
  const container = createContainer<T>();

  return {
    get container() {
      return container;
    },
    load(registrations: Registration[]) {
      const mapped = registrations.map(r => {
        const [registrationId, module, filePath, sourceId, applyModifiers] = r;
        return [registrationId, applyModifiers(module[sourceId])];
      });
      container.register(Object.fromEntries(mapped));
    },
  };
}

export function createContainer<T extends object>(): Container<T> {
  return createAwilixContainer({
    injectionMode: InjectionMode.PROXY,
  });
}

export type Container<T extends object> = Omit<AwilixContainer<T>, 'resolve'> & {
  resolve<K extends (string | symbol)>(name: K, resolveOptions?: ResolveOptions): K extends keyof T ? T[K] : never;
  resolve<V>(name: string | symbol, resolveOptions?: ResolveOptions): V;
}

type Registration = [RegistrationId, Module, FilePath, SourceId, ApplyModifiersFn];
type RegistrationId = string;
type Module = any;
type FilePath = any;
type SourceId = string;
type ApplyModifiersFn = (v: any) => any
