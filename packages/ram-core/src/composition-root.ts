import {
  createContainer as createAwilixContainer,
  InjectionMode,
  AwilixContainer,
  ResolveOptions,
} from 'awilix';

import {createInjector} from './with-injected';
import type {WithInjected} from './with-injected.types';

export function createCompositionRoot<T extends object>(options: Partial<CompositionRootOptions>) {
  const container = createContainer<T>();
  const {
    onReady = () => {
    },
  } = options;
  return new CompositionRoot<T>(container, {
    onReady,
  });
}

class CompositionRoot<Injected extends object> {
  bindingIndex: {[key: string]: string} = {};
  consolePrefix = `[@ram/core/composition-root]`;
  withInjected: Wrapper<Injected>;

  constructor(public container: Container<Injected>, public options: CompositionRootOptions) {
    this.withInjected = createInjector(container) as Wrapper<Injected>;
  }

  load(registrations: Registration[], validate = true) {
    const mapped = registrations.map(r => {
      const [registrationId, module, filePath, sourceId, applyModifiers] = r;
      const exported = this.validateExport(filePath, module, sourceId);
      if (!exported) {
        return [];
      }
      if (validate) {
        this.validateBinding(registrationId, filePath);
      }
      return [registrationId, applyModifiers(exported)];
    });
    this.container.register(Object.fromEntries(mapped));
    this.options.onReady();
  }

  reload(registrations: Registration[], validate = false) {
    if (!registrations.length) {
      return;
    }
    this.load(registrations, validate);
  }

  validateExport(filePath: string, module: Module, sourceId: string) {
    if (!module) {
      console.error(`${this.consolePrefix} Module "${filePath}" not found`);
      return null;
    }
    const exported = module[sourceId];
    if (!exported) {
      console.error(`${this.consolePrefix} ${sourceId} not found in module "${filePath}"`);
      return null;
    }
    return exported;
  }

  validateBinding(registrationId: string, filePath: string) {
    if (this.bindingIndex[registrationId]) {
      console.warn([
        this.consolePrefix,
        `${registrationId} from ${filePath} overrides`,
        `${registrationId} from ${this.bindingIndex[registrationId]}`,
      ].join(' '));
    }
    this.bindingIndex[registrationId] = filePath;
  }
}

type CompositionRootOptions = {
  onReady: () => void,
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

type Wrapper<Injected> = <Component>(component: Component) => WithInjected<Injected, Component>;
