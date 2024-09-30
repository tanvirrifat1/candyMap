import mongoose from 'mongoose';
// import QueryBuilder from '../../builder/QueryBuilder';
// import { candySearchAbleFields } from './candy.constant';
import { TCandyGiver } from './candy.interface';
import { CandyGiver } from './candy.model';
import { AppError } from '../../../utils/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { candySearchAbleFields } from './candy.constant';

// const loginCandyGiver = async (
//   email: string,
//   password: string,
// ): Promise<string | null> => {
//   try {
//     const candyGiver = await CandyGiver.findOne({ email });
//     if (candyGiver && (await bcrypt.compare(password, candyGiver.password))) {
//       // Generate JWT token
//       const token = jwt.sign(
//         { id: candyGiver._id },
//         process.env.DEFAULT_PASSWORD || 'secret',
//         { expiresIn: '1h' },
//       );
//       return token;
//     }
//     return null;
//   } catch (error) {
//     console.error('Error logging in candy giver:', error);
//     throw new Error('Failed to log in candy giver');
//   }
// };

// const getAllCandy = async (query: Record<string, unknown>) => {
//   const adminQuery = new QueryBuilder(CandyGiver.find().populate('user'), query)
//     .search(candySearchAbleFields)
//     .filter()
//     .sort()
//     .paginate()
//     .fields();

//   const result = await adminQuery.modelQuery;
//   return result;
// };
const getAllCandy = async (
  query: Record<string, unknown>,
  lat?: number,
  lng?: number,
  maxDistance?: number,
) => {
  let result;

  if (lat && lng) {
    result = await CandyGiver.aggregate([
      {
        $geoNear: {
          near: {
            type: 'Point',
            coordinates: [lng, lat],
          },
          key: 'currentLon',
          maxDistance: maxDistance ? maxDistance * 1609 : undefined,
          distanceField: 'dist.calculated',
          spherical: true,
        },
      },
      {
        $match: {
          isDeleted: false,
        },
      },
    ]);
  } else {
    const adminQuery = new QueryBuilder(
      CandyGiver.find({ isDeleted: false }).populate('user'),
      query,
    )
      .search(candySearchAbleFields)
      .filter()
      .sort()
      .paginate()
      .fields();

    result = await adminQuery.modelQuery;
  }

  return result;
};

const getSingleCandyIntoDb = async (id: string) => {
  const result = await CandyGiver.findById(id).populate('user');
  return result;
};

const updateCandyGiverIntoDb = async (id: string, payload: TCandyGiver) => {
  const result = await CandyGiver.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteCandyFromDb = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deletedStudent = await CandyGiver.findByIdAndUpdate(
      { _id: id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete candyGiver');
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

export const CandyService = {
  getAllCandy,
  getSingleCandyIntoDb,
  updateCandyGiverIntoDb,
  deleteCandyFromDb,
};
