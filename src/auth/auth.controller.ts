import {
  Controller,
  Post,
  HttpCode,
  Body,
  UsePipes,
  ValidationPipe,
  BadRequestException,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UsePipes(new ValidationPipe())
  @Post('register')
  async register(@Body() dtoIn: AuthDto) {
    const oldUser = await this.authService.getByEmail(dtoIn.email);
    if (oldUser) {
      throw new BadRequestException('Aldready exist');
    }
    return this.authService.create(dtoIn);
  }
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
  async login(@Body() dtoIn: AuthDto) {
    await this.authService.validateUser(dtoIn.email, dtoIn.password);
    return this.authService.login(dtoIn.email);
  }
}
