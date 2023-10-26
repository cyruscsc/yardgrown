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

export const retrieveListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    const sort = req.query.sort || 'createdAt';
    const order = req.query.order || 'desc';

    const { keywords, category, city, delivery, pickup } = req.query;
    const query = {};
    if (keywords) query.title = { $regex: keywords, $options: 'i' };
    if (category) query.category = category;
    if (city) query.city = city;
    if (delivery) query.delivery = delivery;
    if (pickup) query.pickup = pickup;

    const listings = await Listing.find(query)
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);
    res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};

export const retrieveListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return next(errorHandler(404, 'Listing not found'));
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  const currListing = await Listing.findById(req.params.id);
  if (!currListing) return next(errorHandler(404, 'Listing not found'));
  if (req.user.id !== currListing.userRef)
    return next(errorHandler(401, 'User ID Mismatch'));
  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) return next(errorHandler(404, 'Listing not found'));
  if (req.user.id !== listing.userRef)
    return next(errorHandler(401, 'User ID Mismatch'));
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Listing has been deleted' });
  } catch (error) {
    next(error);
  }
};
