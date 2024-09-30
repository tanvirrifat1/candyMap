import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/ValidateRequst';
import { AdminValidationSchema } from '../Admin/admin.validation';

const router = express.Router();

router.post(
  '/create-candy',
  validateRequest(AdminValidationSchema.createAdminValidationSchema),
  UserController.createCandyGiverIntoDb,
);
router.post(
  '/create-admin',
  validateRequest(AdminValidationSchema.updateAdminValidationSchema),
  UserController.createAdminIntoDb,
);

export const UserRoute = router;
