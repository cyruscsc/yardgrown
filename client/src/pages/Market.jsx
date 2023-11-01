import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { endpoints, routes } from '../constants';
import ListingCard from '../components/ListingCard';
import FilterBar from '../components/FilterBar';

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
    if (e.target.type === 'checkbox')
      return setFormData({ ...formData, [e.target.id]: e.target.checked });
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
      <FilterBar
        formData={formData}
        handleChange={handleChange}
        loading={loading}
        error={error}
      />
      {!listings && <span className='text-grullo'>We ran out of stock!</span>}
      {listings && (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-4'>
          {listings.map((listing) => (
            <ListingCard key={listing._id} listing={listing} />
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
