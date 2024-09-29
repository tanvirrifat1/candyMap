import express from 'express';
import { CandyController } from './candy.controller';

const router = express.Router();

// router.post('/signup', CandyController.candyGiverInsert);
// router.post('/login', CandyController.loginCandyGiver);
router.get('/', CandyController.getAllCandy);

export const CandyGiverRoute = router;
