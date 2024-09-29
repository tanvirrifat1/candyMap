import { Model } from 'mongoose';

export type TUser = {
  password: string;
  email: string;
  needsPasswordChange?: boolean;
  role: 'admin' | 'candyGiver';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
};

export type UserModel = {
  isUserExist(
    id: string,
  ): Promise<
    Pick<TUser, 'email' | 'password' | 'role' | 'needsPasswordChange'>
  >;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string,
  ): Promise<boolean>;
} & Model<TUser>;
