/* eslint-disable prettier/prettier */
export class UsersDto {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}
