import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { endpoints } from '../constants';
import {
  FaBagShopping,
  FaCheck,
  FaLocationDot,
  FaPaperPlane,
  FaShare,
  FaTruckFast,
} from 'react-icons/fa6';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import { useSelector } from 'react-redux';

export default function Listing() {
  SwiperCore.use([Navigation]);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [listing, setListing] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    retrieveListing();
  }, [params.id]);

  const retrieveListing = async () => {
    try {
      setLoading(true);
      setError(false);
      const res = await fetch(endpoints.retrieveListings + `/${params.id}`);
      const data = await res.json();
      if (data.success === false) {
        setError(true);
        setLoading(false);
        return;
      }
      setListing(data);
      setError(false);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  return (
    <main>
      {loading && (
        <p className='text-grullo text-2xl text-center my-8'>Loading...</p>
      )}
      {error && (
        <p className='text-pink text-2xl text-center my-8'>
          Something went wrong!
        </p>
      )}
      {listing && !loading && !error && (
        <div>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                  className='h-[32rem]'
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <button
            type='button'
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              setCopied(true);
              setTimeout(() => setCopied(false), 3000);
            }}
            className='fixed-button top-32 right-4 '
          >
            {copied ? (
              <FaCheck className='fill-leaves' />
            ) : (
              <FaShare className='fill-wenge' />
            )}
          </button>
          {currentUser && currentUser._id != listing.userRef && (
            <Link
              type='button'
              to={
                `mailto:${listing.email}` +
                `?subject=YG: I'm interested! ${listing.title}`
              }
              className='fixed-button top-48 right-4 '
            >
              <FaPaperPlane />
            </Link>
          )}
          <article className='max-w-7xl p-4 mx-auto'>
            <h1 className='title flex flex-col gap-4 md:flex-row md:justify-between'>
              <span>{listing.title}</span>{' '}
              <span className='text-pink'>${listing.price.toFixed(2)}</span>
            </h1>
            <div className='flex flex-col gap-4'>
              <span className='text-gray'>
                {listing.category.charAt(0).toUpperCase() +
                  listing.category.slice(1)}
              </span>
              <div className='flex items-center gap-8'>
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
              <p>{listing.description}</p>
            </div>
          </article>
        </div>
      )}
    </main>
  );
}
