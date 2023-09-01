import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, FindUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Body() data: FindUserDto,
  ): Promise<{ access_token: string } | string> {
    return this.authService.login(data);
  }

  @Post('signup')
  signUp(@Body() data: CreateUserDto): Promise<any> {
    return this.authService.signUp(data);
  }
}
