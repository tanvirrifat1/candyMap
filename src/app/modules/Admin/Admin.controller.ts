import httpStatus from 'http-status';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { AdminService } from './Admin.service';

const getAllAdmin = catchAsync(async (req, res) => {
  const result = await AdminService.getAllAdmin(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get all admin successfully',
    data: result,
  });
});

const getSingleAdmin = catchAsync(async (req, res) => {
  const result = await AdminService.getSingleAdmin(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get single admin successfully',
    data: result,
  });
});

const updateAdminGiverIntoDb = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { admin } = req.body;

  const result = await AdminService.updateAdminGiverIntoDb(id, admin);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'update admin successfully',
    data: result,
  });
});

const deleteAdminFromDb = catchAsync(async (req, res) => {
  const result = await AdminService.deleteAdminFromDb(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'delete admin successfully',
    data: result,
  });
});

export const AdminController = {
  getAllAdmin,
  getSingleAdmin,
  updateAdminGiverIntoDb,
  deleteAdminFromDb,
};
