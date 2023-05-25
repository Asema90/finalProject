import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ValidateObjectIdPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    const isParameter =
      value.startsWith(':') && value.replace(':', '') === metadata.data;

    if (!value || isParameter)
      throw new BadRequestException(
        `${metadata.type} ${metadata.data} is required`,
      );
    else if (!isValidObjectId(value))
      throw new BadRequestException(
        `${metadata.type} ${metadata.data} is invalid`,
      );

    return value;
  }
}
