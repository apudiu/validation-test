import {
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { capitalize, formatFromBytes } from '../Helpers';

@ValidatorConstraint()
class FileSize implements ValidatorConstraintInterface {
  validate(value: File, args: ValidationArguments): Promise<boolean> | boolean {
    // passed in arg
    const allowedSize = args.constraints as number[];
    if (!allowedSize?.length) {
      throw new Error('Please provide allowed file size in bytes');
    }

    const minSize = allowedSize[0];
    const maxSize = allowedSize[1];

    // current file size
    const fs = value.size;

    return fs >= minSize && fs <= maxSize;
  }

  defaultMessage(args: ValidationArguments): string {
    const minSize = formatFromBytes(args.constraints[0], ['kilobyte']).kilobyte;
    const maxSize = formatFromBytes(args.constraints[1], ['kilobyte']).kilobyte;

    const currentSize = formatFromBytes(args.value, ['kilobyte']).kilobyte;

    return `${capitalize(
      args.property,
    )} size must be between ${minSize}kb - ${maxSize}kb file, provided ${currentSize}kb`;
  }
}

// size in bytes
export const FileSizeIs = (maxSize: number, minSize = 5000) =>
  Validate(FileSize, [minSize, maxSize]);
