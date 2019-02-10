declare module 'mobx-task' {
  declare const task: TaskFactory<T, U>;

  type TaskState = 'pending' | 'resolved' | 'rejected';

  type UnpackedPromise<T> = T extends Promise<infer R> ? R : T;

  type Worker<U extends any[], R> = (...args: U) => R;

  interface MobXTask<U extends any[], R> {
    (...args: U): R;

    state: TaskState;
    pending: boolean;
    resolved: boolean;
    rejected: boolean;

    result: UnpackedPromise<R> | undefined;
    error: object | undefined;

    match: (matchers: StateMatchers<UnpackedPromise<R>>) => any;
    setState: (props: any) => void;
    reset: () => void;

    bind<T>(this: T, thisArg: ThisParameterType<T>): OmitThisParameter<T>;

    bind<T, A0, A extends any[], R>(
      this: (this: T, arg0: A0, ...args: A) => R,
      thisArg: T, arg0: A0,
    ): MobXTask<A, R>;

    bind<T, A0, A1, A extends any[], R>(
      this: (this: T, arg0: A0, arg1: A1, ...args: A) => R,
      thisArg: T, arg0: A0, arg1: A1,
    ): MobXTask<A, R>;

    bind<T, A0, A1, A2, A extends any[], R>(
      this: (this: T, arg0: A0, arg1: A1, arg2: A2, ...args: A) => R,
      thisArg: T, arg0: A0, arg1: A1, arg2: A2,
    ): MobXTask<A, R>;

    bind<T, A0, A1, A2, A3, A extends any[], R>(
      this: (this: T, arg0: A0, arg1: A1, arg2: A1, arg3: A1, ...args: A) => R,
      thisArg: T,
      arg0: A0, arg1: A1, arg2: A1, arg3: A1,
    ): MobXTask<A, R>;
  }

  interface TaskFactory<T, U extends any[]> {
    <T, U>(worker: Worker<T, U>, options?: object): MobXTask<T, U>;

    resolved: TaskFactory<T, U>;
    rejected: TaskFactory<T, U>;
  }

  type StateMatchers<R, E = Error> = {
    pending: () => any,
    resolved: (result: R) => any,
    rejected: (error: E) => any,
  };
}
