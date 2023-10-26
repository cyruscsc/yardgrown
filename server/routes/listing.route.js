import express from 'express';
import {
  createListing,
  deleteListing,
  retrieveListing,
  retrieveListings,
  updateListing,
} from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

router.get('/retrieve', retrieveListings);
router.get('/retrieve/:id', retrieveListing);
router.post('/create', verifyToken, createListing);
router.post('/update/:id', verifyToken, updateListing);
router.delete('/delete/:id', verifyToken, deleteListing);

export default router;
