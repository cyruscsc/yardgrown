import Listing from '../models/listing.model.js';
import { errorHandler } from '../utils/error.js';

export const createListing = async (req, res, next) => {
  try {
    const newListing = await Listing.create(req.body);
    res.status(201).json(newListing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const currListing = await Listing.findById(req.params.id);
  if (!currListing) return next(errorHandler(404, 'Listing not found'));
  if (req.user.id !== currListing.userRef)
    return next(errorHandler(401, 'User ID Mismatch'));
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Listing has been deleted' });
  } catch (error) {
    next(error);
  }
};
