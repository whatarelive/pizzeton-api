import { Module } from '@nestjs/common';
import { PaginationDto } from './dto/paginationDto.dto';

@Module({
  exports: [PaginationDto],
})
export class CommonModule {}
