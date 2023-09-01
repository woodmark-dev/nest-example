/* eslint-disable prettier/prettier */
import { IsString, IsEmail, IsNotEmpty, isString } from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  password: string;
  firstName?: string;
  lastName?: string;
}

export class FindUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
