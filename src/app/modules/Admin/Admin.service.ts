import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { adminSearchAbleFields } from './admin.constant';
import { TAdmin } from './Admin.interface';
import { Admin } from './Admin.model';
import { AppError } from '../../../utils/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';

const getAllAdmin = async (query: Record<string, unknown>) => {
  const studentQuery = new QueryBuilder(Admin.find().populate('user'), query)
    .search(adminSearchAbleFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await studentQuery.modelQuery;
  return result;
};

const getSingleAdmin = async (id: string) => {
  const result = await Admin.findById(id).populate('user');
  return result;
};

const updateAdminGiverIntoDb = async (id: string, payload: TAdmin) => {
  const result = await Admin.findByIdAndUpdate(id, payload, {
    new: true,
  });
  console.log(result);
  return result;
};

const deleteAdminFromDb = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deletedStudent = await Admin.findByIdAndUpdate(
      { _id: id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete admin');
    }

    const userId = deletedStudent.user;

    const deleteUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deleteUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, `${error}`);
  }
};

export const AdminService = {
  getAllAdmin,
  getSingleAdmin,
  updateAdminGiverIntoDb,
  deleteAdminFromDb,
};
