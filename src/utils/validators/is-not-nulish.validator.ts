import { Maybe, Static } from '../utils.types';
import { GenericValidatorInterface } from '../interfaces/generic-validator.interface';

export class IsNotNullishValidator
  implements Static<typeof IsNotNullishValidator, GenericValidatorInterface>
{
  static check = <T>(value: Maybe<T>): value is T => {
    return value !== undefined && value !== null;
  };
}
