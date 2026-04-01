import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class MaxLengthPipe implements PipeTransform {
  constructor(private readonly maxLength: number) {}

  transform(value: string, metadata: ArgumentMetadata) {
    value = String(value).trim();
    if (value.length > this.maxLength) {
      throw new BadRequestException(
        `Value must be at most ${this.maxLength} characters long`,
      );
    }
    return value;
  }
}

@Injectable()
export class MinLengthPipe implements PipeTransform {
  constructor(private readonly minLength: number) {}

  transform(value: string, metadata: ArgumentMetadata) {
    value = String(value).trim();
    if (value.length < this.minLength) {
      throw new BadRequestException(
        `Value must be at least ${this.minLength} characters long`,
      );
    }
    return value;
  }
}
