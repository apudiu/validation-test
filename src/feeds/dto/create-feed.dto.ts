import { z } from 'zod';
import { config } from '../../utils/config';
import { formatFromBytes } from '../../utils/Helpers';
import { ZodDtoClass } from '../../utils/zod-dto.interface';

const schema = z
  .object({
    title: z.string().min(5).max(35).nullish(),
    body: z.string().max(140).nullish(),
    attachment: z.instanceof(File).nullish(),
  })
  .refine(
    (d) => {
      console.log({
        data: d, // empty.... { data: {} }, so this fails
      });

      if (d.title) return true;
      if (d.body) return true;
      if (d.attachment) return true;

      return false;
    },
    {
      path: ['title'],
      message: "Title, Body and attachment can't be empty at the same time",
    },
  )
  .superRefine((d, ctx) => {
    if (!d.attachment) return;

    // file size validation
    const allowedMaxSize = config.file.maxSize;
    if (d.attachment.size > allowedMaxSize) {
      ctx.addIssue({
        code: z.ZodIssueCode.too_big,
        type: 'number',
        maximum: allowedMaxSize,
        inclusive: true,
        fatal: true,
        message: `Max file size is ${formatFromBytes(allowedMaxSize, ['megabyte']).megabyte} MB`,
      });
    }

    // mime validation
    const allowedMimes = config.file.image.mimes;
    if (!allowedMimes.includes(d.attachment.type)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Only ${allowedMimes} are allowed`,
      });
    }
  });

export class CreateFeedDto extends ZodDtoClass<typeof schema> {
  static override schema = schema;
}
