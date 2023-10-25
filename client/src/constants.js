export const routes = {
  home: '/',
  about: '/about',
  market: '/market',
  signUp: '/sign-up',
  signIn: '/sign-in',
  signOut: '/sign-out',
  profile: '/profile',
  createListing: '/create-listing',
  editListing: '/edit-listing',
  myListings: '/my-listings',
};

export const endpoints = {
  // auth endpoints
  signUp: '/api/auth/sign-up',
  signIn: '/api/auth/sign-in',
  signOut: '/api/auth/sign-out',
  google: '/api/auth/google',

  // user endpoints
  updateUser: '/api/user/update',
  deleteUser: '/api/user/delete',
  userListings: '/api/user/listings',

  // listing endpoints
  retrieveListing: '/api/listing/retrieve',
  createListing: '/api/listing/create',
  updateListing: '/api/listing/update',
  deleteListing: '/api/listing/delete',
};

export const categories = [
  'flowers',
  'fruits',
  'seasonings',
  'seeds',
  'shrubs',
  'trees',
  'veggies',
];
