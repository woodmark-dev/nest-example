import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto, FindUserDto } from './dto/create-user.dto';
import * as argon from 'argon2';
import { Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt/dist';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async login(data: FindUserDto): Promise<{ access_token: string } | string> {
    //find user. If user doesn't exist return exception
    const user = await this.prismaService.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) throw new ForbiddenException('Incorrect email or password');

    //compare password. If wrong return exception
    const isCorrect = await argon.verify(user.password, data.password);

    if (!isCorrect) throw new ForbiddenException('Incorrect email or password');

    //return success
    delete user.password;
    return this.signToken(user.id, user.email);
  }

  async signUp(data: CreateUserDto) {
    try {
      const hash = await argon.hash(data.password);
      const user = await this.prismaService.user.create({
        data: {
          email: data.email,
          password: hash,
        },
      });
      //disabling the password from being returned
      delete user.password;
      return user;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code == 'P2002') {
          throw new ForbiddenException('Credentials Taken');
        }
      }
      throw error;
    }
  }
  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const access_token = await this.jwt.signAsync(payload, {
      expiresIn: this.config.get('jwtExpiration'),
      secret: this.config.get('jwtSecret'),
    });
    return {
      access_token,
    };
  }
}
