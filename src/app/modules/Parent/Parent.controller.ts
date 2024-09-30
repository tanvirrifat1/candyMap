import httpStatus from 'http-status';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { ParentService } from './Parent.service';

const createParentIntoDb = catchAsync(async (req, res) => {
  const result = await ParentService.createParentIntoDb(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'parent account create successfully',
    data: result,
  });
});

export const ParentController = {
  createParentIntoDb,
};
