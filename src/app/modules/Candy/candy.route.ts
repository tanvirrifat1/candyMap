import express from 'express';
import { CandyController } from './candy.controller';

const router = express.Router();

router.get('/nearby', CandyController.getAllCandy);
router.get('/:id', CandyController.getSingleCandyIntoDb);
router.patch('/:id', CandyController.updateCandyGiverIntoDb);
router.delete('/:id', CandyController.deleteCandyFromDb);

export const CandyGiverRoute = router;
