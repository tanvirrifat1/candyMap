import httpStatus from 'http-status';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { UserService } from './user.service';

const createCandyGiverIntoDb = catchAsync(async (req, res) => {
  const { password, candy: candyGiverData } = req.body;

  const result = await UserService.createCandyGiverIntoDb(
    password,
    candyGiverData,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'CandyGiver created successfully',
    data: result,
  });
});

const createAdminIntoDb = catchAsync(async (req, res) => {
  const { password, admin: AdminData } = req.body;

  const result = await UserService.createAdminIntoDb(password, AdminData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin created successfully',
    data: result,
  });
});

export const UserController = {
  createCandyGiverIntoDb,
  createAdminIntoDb,
};
