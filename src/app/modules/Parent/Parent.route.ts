import express from 'express';
import { ParentController } from './Parent.controller';

const router = express.Router();

// Define the POST route for sending an email
router.post('/send-email', ParentController.createParentIntoDb);

export const ParentRoute = router;
