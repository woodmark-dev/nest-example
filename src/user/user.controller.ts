import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UsersDto } from './dto/all-users.dto';
import { JwtGuard } from '../auth/guards/auth.guards';
import { User } from '../decorators/user.decorators';

@Controller('user')
export class UserController {
  constructor(private users: UserService) {}

  @UseGuards(JwtGuard)
  @Get('all-users')
  async getAllUsers(@User() user: UsersDto): Promise<Array<UsersDto>> {
    console.log(user);
    return this.users.getAllUsers();
  }
}
