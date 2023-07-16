import { Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ZodDtoClass } from '../utils/zod-dto.interface';

@Injectable()
export class ZodValidationPipe {
  transform(value: Record<string, unknown>, metadata: ArgumentMetadata) {
    const schemaClass: typeof ZodDtoClass = metadata.metatype! as unknown as typeof ZodDtoClass;

    const result = schemaClass.schema.safeParse(value);
    if (!result.success) {
      throw new BadRequestException(result.error.flatten());
    }

    return { data: result.data };
  }
}
