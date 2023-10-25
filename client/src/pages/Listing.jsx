import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { endpoints } from '../constants';
import {
  FaBagShopping,
  FaEnvelope,
  FaLocationDot,
  FaPhone,
  FaTruckFast,
} from 'react-icons/fa6';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';

export default function Listing() {
  SwiperCore.use([Navigation]);
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [listing, setListing] = useState(null);

  useEffect(() => {
    retrieveListing();
  }, [params.id]);

  const retrieveListing = async () => {
    try {
      setLoading(true);
      setError(false);
      const res = await fetch(endpoints.retrieveListing + `/${params.id}`);
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
          <article className='max-w-5xl p-4 mx-auto'>
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
              <div className='flex items-center gap-8'>
                {listing.phone && (
                  <div className='flex items-center gap-2'>
                    <FaPhone className='fill-xanadu' />
                    <span className='text-xanadu'>{listing.phone}</span>
                  </div>
                )}
                {listing.email && (
                  <div className='flex items-center gap-2'>
                    <FaEnvelope className='fill-xanadu' />
                    <span className='text-xanadu'>{listing.email}</span>
                  </div>
                )}
              </div>
            </div>
          </article>
        </div>
      )}
    </main>
  );
}
