import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async getAllUsers(): Promise<Array<User>> {
    const users = await this.prismaService.user.findMany({});
    return users.map((user) => {
      delete user.password;
      return user;
    });
  }
}
