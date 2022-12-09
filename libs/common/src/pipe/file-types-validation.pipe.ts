import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class FileTypesValidationPipe implements PipeTransform {
  types = [];
  errorMessage = '';

  constructor(types: string[], errorMessage = '文件类型不合法') {
    this.types = types;
    this.errorMessage = errorMessage;
  }

  transform(value: { mimetype: string }, metadata: ArgumentMetadata) {
    if (!this.types.some((t) => value.mimetype.endsWith(t))) {
      throw new BadRequestException(this.errorMessage);
    }
    return value;
  }
}
