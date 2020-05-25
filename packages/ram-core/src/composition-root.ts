import {
  createContainer as createAwilixContainer,
  InjectionMode,
  AwilixContainer,
  ResolveOptions,
} from 'awilix';

export function createCompositionRoot<T extends object>(basePath = './src/') {
  const container = createContainer<T>();
  return new CompositionRoot<T>(container, basePath);
}

class CompositionRoot<T extends object> {
  bindingIndex: {[key: string]: string} = {};
  consolePrefix = `[@ram/core/composition-root]`;

  constructor(public container: Container<T>, public basePath: string) {
  }

  load(registrations: Registration[]) {
    const mapped = registrations.map(r => {
      const [registrationId, module, filePath, sourceId, applyModifiers] = r;
      const exported = this.validateExport(filePath, module, sourceId);
      if (!exported) {
        return [];
      }
      this.validateBinding(registrationId, filePath);
      return [registrationId, applyModifiers(exported)];
    });
    this.container.register(Object.fromEntries(mapped));
  }

  validateExport(filePath: string, module: Module, sourceId: string) {
    if (!module) {
      console.error(`${this.consolePrefix} Module "${this.formatPath(filePath)}" not found`);
      return null;
    }
    const exported = module[sourceId];
    if (!exported) {
      console.error(`${this.consolePrefix} ${sourceId} not found in module "${this.formatPath(filePath)}"`);
      return null;
    }
    return exported;
  }

  validateBinding(registrationId: string, filePath: string) {
    if (this.bindingIndex[registrationId]) {
      console.warn([
        this.consolePrefix,
        `${registrationId} from ${(this.formatPath(filePath))} overrides`,
        `${registrationId} from ${this.formatPath(this.bindingIndex[registrationId])}`,
      ].join(' '));
    }
    this.bindingIndex[registrationId] = filePath;
  }

  formatPath(filePath: string) {
    return this.basePath + filePath;
  }
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
