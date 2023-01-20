export type Maybe<T> = T | undefined | null;

export type Static<
  TClass extends IStaticInterface & { new (...args: any[]): any },
  IStaticInterface,
> = InstanceType<TClass>;
