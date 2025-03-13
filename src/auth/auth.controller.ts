import type { UUID } from 'crypto';
import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUser } from './decorators/get-user.decorator';

/**
 * Controlador de Autenticación
 *
 * @description Controlador que maneja todas las operaciones relacionadas con la autenticación de usuarios,
 * incluyendo registro, inicio de sesión, generación de tokens y gestión de estados de usuario.
 */
@Controller('auth')
export class AuthController {
  // Se istancia el servicio de módulo de Auth
  constructor(private readonly authService: AuthService) {}

  // Crea un nuevo usuario en el sistema
  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  // Inicia sesión de un usuario existente
  @Post('login')
  loginUser(@Body() loginUserDto: CreateUserDto) {
    return this.authService.login(loginUserDto);
  }

  // Genera un nuevo token de acceso para un usuario autenticado
  @Get('token')
  @UseGuards(AuthGuard())
  createNewToken(@GetUser('id', ParseUUIDPipe) id: UUID) {
    return this.authService.createNewToken(id);
  }

  // Actualiza los datos de un usuario
  @Patch(':id')
  @UseGuards(AuthGuard())
  updateUser(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.authService.update(id, updateUserDto);
  }
}
