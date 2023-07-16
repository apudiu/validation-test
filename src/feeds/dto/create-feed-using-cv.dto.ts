import { IsInstance, IsOptional, IsString, Length, Validate } from 'class-validator';
import { config } from '../../utils/config';
import { FileSizeIs } from '../../utils/validationRules/FileSize';
import { FileTypeIs } from '../../utils/validationRules/FileType';
// import { FileSize } from '../../utils/validationRules/FileSize';
// import { FileType } from '../../utils/validationRules/FileType';
import { NotEmptyWhenOtherFieldsEmpty } from '../../utils/validationRules/NotEmptyWhenOtherFieldsEmpty';

export class CreateFeedDto {
  @IsOptional()
  @Length(3, 100)
  @IsString()
  @Validate(NotEmptyWhenOtherFieldsEmpty, ['body', 'attachment'])
  title: string;

  @IsOptional()
  @Length(5, 500)
  @IsString()
  body: string;

  @IsOptional()
  // @Validate(FileSize, [5000, config.file.maxSize])
  // @Validate(FileType, [config.file.image.mimes])
  // @FileTypeIs(config.file.image.mimes)
  // @FileSizeIs(config.file.maxSize)
  @IsInstance(File)
  attachment: File;
}
