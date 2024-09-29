import httpStatus from 'http-status';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { AdminService } from './Admin.service';

const getAllAdmin = catchAsync(async (req, res) => {
  const result = await AdminService.getAllAdmin();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get all admin',
    data: result,
  });
});

export const AdminController = {
  getAllAdmin,
};
