import httpStatus from 'http-status';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { CandyService } from './candy.service';

const getAllCandy = catchAsync(async (req, res) => {
  const { lat, lng, maxDistance, ...query } = req.query;

  const result = await CandyService.getAllCandy(
    query,
    lat ? Number(lat) : undefined,
    lng ? Number(lng) : undefined,
    maxDistance ? Number(maxDistance) : undefined,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'candyGiver retrieved successfully',
    data: result,
  });
});

const getSingleCandyIntoDb = catchAsync(async (req, res) => {
  const result = await CandyService.getSingleCandyIntoDb(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'single candyGiver get successfully',
    data: result,
  });
});

const updateCandyGiverIntoDb = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { candy } = req.body;

  const result = await CandyService.updateCandyGiverIntoDb(id, candy);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'update candyGiver successfully',
    data: result,
  });
});

const deleteCandyFromDb = catchAsync(async (req, res) => {
  const result = await CandyService.deleteCandyFromDb(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'delete candyGiver successfully',
    data: result,
  });
});

export const CandyController = {
  getAllCandy,
  getSingleCandyIntoDb,
  updateCandyGiverIntoDb,
  deleteCandyFromDb,
};
