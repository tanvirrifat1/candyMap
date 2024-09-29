import { TAdmin } from '../Admin/Admin.interface';
import { Admin } from '../Admin/Admin.model';

import { TCandyGiver } from '../Candy/candy.interface';
import { CandyGiver } from '../Candy/candy.model';
import { TUser } from './user.interface';
import { User } from './user.model';

const createCandyGiverIntoDb = async (
  data: TCandyGiver,
): Promise<{ candyGiver: TCandyGiver; user: TUser }> => {
  const user = await User.create({
    email: data.email,
    password: data.password,
    role: 'candyGiver',
  });

  const candyGiver = await CandyGiver.create({
    ...data,
    user: user._id,
  });
  console.log(candyGiver, 'candyGiver');
  return { candyGiver, user };
};

const createAdminIntoDb = async (
  data: TAdmin,
): Promise<{ admin: TAdmin; user: TUser }> => {
  const user = await User.create({
    email: data.email,
    password: data.password,
    role: 'admin',
  });

  const admin = await Admin.create({
    ...data,
    user: user._id,
  });
  console.log(admin, 'admin');
  return { admin, user };
};

export const UserService = {
  createCandyGiverIntoDb,
  createAdminIntoDb,
};
