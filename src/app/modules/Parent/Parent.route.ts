import express from 'express';
import { ParentController } from './Parent.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../enum/user';

const router = express.Router();

// Define the POST route for sending an email
router.post(
  '/send-email',
  auth(ENUM_USER_ROLE.CANDY_GIVER),
  ParentController.createParentIntoDb,
);

export const ParentRoute = router;
