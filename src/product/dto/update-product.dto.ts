import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDTO } from './create-product.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateProductDTO extends PartialType(CreateProductDTO) {
  @IsOptional()
  @IsBoolean()
  readonly stock?: boolean;
}
