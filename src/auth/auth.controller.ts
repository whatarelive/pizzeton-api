import type { UUID } from 'crypto';
import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Auth } from './decorators/auth.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from 'src/common/dto/paginationDto.dto';
import { ValidRoles } from './interfaces/valid_roles';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register') // Crea un nuevo usuario.
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login') // Crea la sesion del usuario.
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('test') // Recupera la lista de ususrios.
  find() {
    return 'Hola Mundo';
  }

  @Get('users') // Recupera la lista de ususrios.
  @Auth(ValidRoles.admin)
  findAll(@Query() paginationDto: PaginationDto) {
    return this.authService.findAll(paginationDto);
  }

  @Patch(':id') // Actualiza el estado de IsBaned de los usuarios.
  @Auth(ValidRoles.admin)
  updateUser(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.authService.update(id, updateUserDto);
  }
}
