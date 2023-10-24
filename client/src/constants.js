export const routes = {
  home: '/',
  about: '/about',
  signUp: '/sign-up',
  signIn: '/sign-in',
  signOut: '/sign-out',
  profile: '/profile',
  createListing: '/create-listing',
  myListings: '/my-listings',
};

export const endpoints = {
  signUp: '/api/auth/sign-up',
  signIn: '/api/auth/sign-in',
  signOut: '/api/auth/sign-out',
  google: '/api/auth/google',
  updateUser: '/api/user/update',
  deleteUser: '/api/user/delete',
  createListing: 'api/listing/create',
  userListings: 'api/user/listings',
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
