import httpStatus from 'http-status';
import { AppError } from '../../../utils/AppError';
import { TAdmin } from '../Admin/Admin.interface';
import { Admin } from '../Admin/Admin.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import mongoose from 'mongoose';
import config from '../../config';
import { TCandyGiver } from '../Candy/candy.interface';
import { CandyGiver } from '../Candy/candy.model';

const createCandyGiverIntoDb = async (
  password: string,
  payload: TCandyGiver,
) => {
  const userData: Partial<TUser> = {};
  //if password is not given , use default password
  userData.password = password || (config.default_password as string);

  userData.role = 'candyGiver';
  userData.email = payload.email;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create candyGiver');
    }

    payload.user = newUser[0]._id;

    const newCandy = await CandyGiver.create([payload], { session });

    if (!newCandy.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create candyGiver');
    }

    await session.commitTransaction();
    await session.endSession();

    return newCandy;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, `${error}`);
  }
};
const createAdminIntoDb = async (password: string, payload: TAdmin) => {
  const userData: Partial<TUser> = {};
  //if password is not given , use default password
  userData.password = password || (config.default_password as string);

  userData.role = 'admin';
  userData.email = payload.email;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }

    payload.user = newUser[0]._id;

    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, `${error}`);
  }
};

export const UserService = {
  createCandyGiverIntoDb,
  createAdminIntoDb,
};
