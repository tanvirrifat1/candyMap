import httpStatus from 'http-status';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { CandyService } from './candy.service';

// const candyGiverInsert = catchAsync(async (req, res) => {
//   const result = await CandyService.candyGiverInsert(req.body);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'candyGiver created successfully',
//     data: result,
//   });
// });

// const loginCandyGiver = catchAsync(async (req: Request, res: Response) => {
//   const { email, password } = req.body;

//   const token = await CandyService.loginCandyGiver(email, password);

//   if (!token) {
//     return sendResponse(res, {
//       statusCode: httpStatus.UNAUTHORIZED,
//       success: false,
//       message: 'Invalid email or password',
//       data: null,
//     });
//   }

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Login successful',
//     data: { token },
//   });
// });

const getAllCandy = catchAsync(async (req, res) => {
  const result = await CandyService.getAllCandy();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'candyGiver get successfully',
    data: result,
  });
});

export const CandyController = {
  getAllCandy,
};
