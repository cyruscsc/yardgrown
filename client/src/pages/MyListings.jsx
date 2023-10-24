import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { endpoints } from '../constants';
import { FaEraser, FaPencil } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

export default function MyListings() {
  const { currentUser } = useSelector((state) => state.user);
  const [myListings, setMyListings] = useState([]);
  const [getMyListingsError, setGetMyListingsError] = useState(false);

  useEffect(() => {
    getMyListings();
  }, []);

  const getMyListings = async () => {
    try {
      setGetMyListingsError(false);
      const res = await fetch(endpoints.userListings + `/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) return setGetMyListingsError(true);
      setMyListings(data);
    } catch (error) {
      setGetMyListingsError(true);
    }
  };

  return (
    <main className='max-w-5xl px-4 mx-auto'>
      <h1 className='title text-center'>My Listings</h1>
      <div className=' grid grid-cols-1 md:grid-cols-2 gap-4'>
        {myListings.length > 0 ? (
          myListings.map((listing) => (
            <div
              key={listing._id}
              className='flex items-center justify-between gap-4 bg-linen border border-leaves rounded-lg p-3'
            >
              <img
                src={listing.imageUrls[0]}
                alt={listing.title}
                className='h-24 w-36 object-contain object-center rounded-lg'
              />
              <Link>
                <h3 className='text-xl font-medium'>{listing.title}</h3>
                <p>{new Date(listing.createdAt).toLocaleDateString()}</p>
              </Link>
              <div className='flex flex-col gap-4 text-lg'>
                <button>
                  <FaPencil className='fill-grullo' />
                </button>
                <button>
                  <FaEraser className='fill-pink' />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>You have no active listings at the moment</p>
        )}
        {getMyListingsError && (
          <p className='text-pink'>Failed to show listings, please try again</p>
        )}
      </div>
    </main>
  );
}
