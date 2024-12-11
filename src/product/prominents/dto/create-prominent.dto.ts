import { IsUUID } from 'class-validator';

export class CreateProminentDto {
  @IsUUID()
  productId: string;
}
