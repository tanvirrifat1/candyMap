import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.post('/create-candy', UserController.createCandy);
router.post('/create-admin', UserController.createAdminIntoDb);

export const UserRoute = router;
