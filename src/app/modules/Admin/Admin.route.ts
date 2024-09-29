import express from 'express';
import { AdminController } from './Admin.controller';

const router = express.Router();

router.get('/', AdminController.getAllAdmin);

export const AdminRoute = router;
