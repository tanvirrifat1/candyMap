import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/ValidateRequst';
import { AdminValidationSchema } from '../Admin/admin.validation';
import { CandyValidationSchema } from '../Candy/candy.validation';

const router = express.Router();

router.post(
  '/create-candy',
  validateRequest(CandyValidationSchema.createCandyValidationSchema),
  UserController.createCandyGiverIntoDb,
);
router.post(
  '/create-admin',
  validateRequest(AdminValidationSchema.updateAdminValidationSchema),
  UserController.createAdminIntoDb,
);

export const UserRoute = router;
