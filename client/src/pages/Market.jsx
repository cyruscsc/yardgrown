import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { endpoints, routes } from '../constants';
import { FaBagShopping, FaLocationDot, FaTruckFast } from 'react-icons/fa6';

export default function Market() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({});
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const allParams = {};
    urlParams.forEach((val, key) => (allParams[key] = val));
    setFormData(allParams);
    retrieveListings(urlParams.toString(), false);
  }, [window.location.search]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    for (const key in formData)
      formData[key] ? urlParams.set(key, formData[key]) : urlParams.delete(key);
    const queryParams = urlParams.toString();
    navigate(routes.market + `?${queryParams}`);
  }, [formData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleShowMore = () => {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('startIndex', listings.length);
    retrieveListings(urlParams.toString(), true);
  };

  const retrieveListings = async (query, append) => {
    try {
      setLoading(true);
      setError(false);
      const res = await fetch(endpoints.retrieveListings + `?${query}`);
      const data = await res.json();
      if (data.success === false) {
        setError(true);
        setLoading(false);
        return;
      }
      setListings(append ? [...listings, ...data] : data);
      setShowMore(data.length >= 9 ? true : false);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  return (
    <main className='max-w-7xl px-4 mx-auto'>
      <h1 className='title'>YG Market</h1>
      <div className='flex items-center justify-start flex-wrap gap-4 my-4'>
        <select
          value={formData.sort || ''}
          onChange={handleChange}
          id='sort'
          className={`w-32 p-2 border border-linen rounded-lg ${
            formData.sort ? 'text-wenge' : 'text-gray'
          }`}
        >
          <option value=''>Sort by</option>
          <option value='createdAt'>Date</option>
          <option value='price'>Price</option>
        </select>
        <select
          value={formData.order || ''}
          disabled={!formData.sort}
          onChange={handleChange}
          id='order'
          className={`w-32 p-2 border border-linen rounded-lg ${
            formData.order ? 'text-wenge' : 'text-gray'
          }`}
        >
          <option value=''>Order from</option>
          <option value='asc'>
            {formData.sort === 'price' ? 'Low to High' : 'Old to new'}
          </option>
          <option value='desc'>
            {formData.sort === 'price' ? 'High to Low' : 'New to old'}
          </option>
        </select>
        {loading && <span className='text-leaves'>Loading...</span>}
        {error && <span className='text-pink'>Something went wrong!</span>}
      </div>
      {!listings && <span className='text-grullo'>We ran out of stock!</span>}
      {listings && (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-4'>
          {listings.map((listing) => (
            <article className='flex flex-col items-center justify-start bg-white border border-champagne rounded-lg overflow-hidden'>
              <img
                src={listing.imageUrls[0]}
                alt={listing.title}
                className='h-64 w-full object-cover object-center'
              />
              <div className='flex flex-col items-start justify-start gap-4 p-3'>
                <h2 className='font-bold text-lg my-2'>{listing.title}</h2>
                <span className='text-gray'>
                  {listing.category.charAt(0).toUpperCase() +
                    listing.category.slice(1)}
                </span>
                <p className=' line-clamp-3'>{listing.description}</p>
                <div className='flex items-center justify-start gap-16 w-full'>
                  <span className='text-pink'>${listing.price.toFixed(2)}</span>

                  <span className='text-gray'>
                    {new Date(listing.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className='flex items-center justify-start gap-8'>
                  <div className='flex items-center gap-2'>
                    <FaLocationDot className='fill-grullo' />
                    <span className='text-grullo'>{listing.city}</span>
                  </div>
                  {listing.delivery && (
                    <div className='flex items-center gap-2'>
                      <FaTruckFast className='fill-xanadu' />
                      <span className='text-xanadu'>Delivery</span>
                    </div>
                  )}
                  {listing.pickup && (
                    <div className='flex items-center gap-2'>
                      <FaBagShopping className='fill-xanadu' />
                      <span className='text-xanadu'>Pickup</span>
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
      <div className='py-4 text-center'>
        {showMore ? (
          <button
            type='button'
            onClick={handleShowMore}
            className='button border border-leaves bg-transparent text-leaves hover:bg-leaves hover:text-snow'
          >
            Show More
          </button>
        ) : (
          <span className='text-grullo'>You have reached the bottom!</span>
        )}
      </div>
    </main>
  );
}
