import { Module } from '@nestjs/common';
import { ErrorHandler } from './helpers/ErrorsHandler';

@Module({
  providers: [ErrorHandler],
  exports: [ErrorHandler],
})
export class CommonModule {}
