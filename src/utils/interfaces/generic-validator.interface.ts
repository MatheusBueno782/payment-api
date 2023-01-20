export interface GenericValidatorInterface {
  check<T>(value: any): value is T;
}
