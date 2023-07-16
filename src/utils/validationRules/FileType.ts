import {
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { capitalize } from '../Helpers';

@ValidatorConstraint()
class FileType implements ValidatorConstraintInterface {
  validate(value: File, args: ValidationArguments): Promise<boolean> | boolean {
    // passed in arg
    const allowedMimes = args.constraints as string[];
    if (!allowedMimes?.length) {
      throw new Error('Please provide allowed mimes');
    }

    return allowedMimes.includes(value.type);
  }

  defaultMessage(args: ValidationArguments): string {
    return `${capitalize(args.property)} must be a valid ${args.constraints} file`;
  }
}

// file full mimes
export const FileTypeIs = (mimes: string[]) => Validate(FileType, mimes);
