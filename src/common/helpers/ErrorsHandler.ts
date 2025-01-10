import { Injectable } from '@nestjs/common';
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common/exceptions';

@Injectable()
export class ErrorHandler {
  purge(error: any, module: string) {
    if (error.code === 'P2002') {
      throw new BadRequestException({
        field: error.meta.target[0],
        message: `Este ${error.meta.target}: ya esta ocupado.`,
      });
    }

    if (error.code === 'P2025') {
      throw new NotFoundException(`Este ${module} con este id no existe.`);
    }

    throw new InternalServerErrorException(
      `Can't creant ${module} - Check Server logs`,
    );
  }
}
