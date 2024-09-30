import express from 'express';
import { AdminController } from './Admin.controller';

const router = express.Router();

router.get('/', AdminController.getAllAdmin);
router.get('/:id', AdminController.getSingleAdmin);
router.patch('/:id', AdminController.updateAdminGiverIntoDb);
router.delete('/:id', AdminController.deleteAdminFromDb);

export const AdminRoute = router;
