import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './dto';
import { Auth } from './decorators';
import { ValidRoles } from './interfaces/valid_roles';
import { UUID } from 'crypto';

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

  @Get('users') // Recupera la lista de ususrios.
  @Auth(ValidRoles.admin)
  findAll() {
    return this.authService.findAll();
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
