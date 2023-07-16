import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { capitalize } from '../Helpers';

@ValidatorConstraint()
export class NotEmptyWhenOtherFieldsEmpty implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments): Promise<boolean> | boolean {
    // whole object
    const allFields = args.object;
    console.log({
      value,
    });
    // passed in arg
    const fieldsNames = args.constraints as string[];
    if (!fieldsNames?.length) {
      throw new Error('Please provide fields');
    }

    const currentField = args.property;

    // don't allow self
    if (fieldsNames.includes(currentField)) {
      throw new Error(`Can't list self "${currentField}" as fields`);
    }

    // add current field to field names so this one also gets validated
    const validationFields = [...fieldsNames, currentField];

    const emptyFields = validationFields.filter((fieldName) => {
      // if invalid field provided then err
      if (!(fieldName in allFields)) {
        throw new Error(`Field "${fieldName}" doesn't exits in the class`);
      }

      const fieldValue = allFields[fieldName];
      return !fieldValue;
    });

    return emptyFields.length < validationFields.length;
  }

  defaultMessage(args: ValidationArguments): string {
    return `${capitalize(args.constraints)} and ${capitalize(
      args.property,
    )} can't be empty at the same time`;
  }
}

// the deco

// export function NotAllEmpty(property: string, validationOptions: ValidationOptions) {
//   return function (object: object, propertyName: string) {
//     registerDecorator({
//       name: 'NotAllEmpty',
//       target: object.constructor,
//       propertyName,
//       constraints: [property],
//       options: validationOptions,
//       validator: NotAllEmptyConstraint,
//     });
//   };
// }
