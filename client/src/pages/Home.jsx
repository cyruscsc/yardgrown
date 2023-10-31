import { Link } from 'react-router-dom';
import { endpoints, routes } from '../constants';
import { FaArrowRight } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import ListingCard from '../components/ListingCard';
import seeding from '../assets/seeding.jpg';
import { homePageText } from '../text';

export default function Home() {
  const [newListings, setNewListings] = useState([]);

  useEffect(() => {
    retrieveNewListings();
  }, []);

  const retrieveNewListings = async () => {
    try {
      const res = await fetch(
        endpoints.retrieveListings + '?limit=4&sort=createdAt&order=desc'
      );
      const data = await res.json();
      if (data.success === false) return;
      setNewListings(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <section id='hero' className='bg-leaves'>
        <div className='flex flex-col items-start justify-center gap-4 max-w-7xl m-auto px-4 py-16'>
          <h1 className='text-3xl md:text-5xl font-medium'>
            Cultivate <span className='text-pink'>happiness</span>,
            <br />
            From backyard to everywhere
          </h1>
          <p className='text-xanadu'>
            Discover, share, and embrace the bountiful beauty of homegrown
            treasures.
          </p>
          <Link
            to={routes.market}
            className='flex items-center justify-start gap-2 font-medium text-lg text-grullo mt-4'
          >
            Explore the market
            <FaArrowRight className='fill-grullo' />
          </Link>
        </div>
      </section>
      <section id='newest'>
        <div className='max-w-7xl m-auto px-4 py-16'>
          <h1 className='title text-center'>Newest Listings</h1>
          <div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-4'>
              {newListings.map((listing) => (
                <ListingCard key={listing._id} listing={listing} />
              ))}
            </div>
          </div>
          <Link
            to={routes.market + `?sort=createdAt&order=desc`}
            className='flex items-center justify-end gap-2 font-medium text-lg text-grullo mt-4'
          >
            Discover more treasures
            <FaArrowRight className='fill-grullo' />
          </Link>
        </div>
      </section>
      <section id='community' className='bg-linen'>
        <div className='max-w-7xl mx-auto px-4 py-16'>
          <h1 className='title text-center'>Grow our community!</h1>
          <div className='grid grid-cols-1 md:grid-cols-[2fr_3fr] items-center gap-4 '>
            <div>
              <img
                src={seeding}
                alt='Seeding'
                className='h-64 object-cover object-center mx-auto rounded-lg'
              />
            </div>
            <div>
              <p>{homePageText}</p>
              <Link
                to={routes.about}
                className='flex items-center justify-start gap-2 font-medium text-lg text-grullo mt-4'
              >
                Learn more about us
                <FaArrowRight className='fill-grullo' />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
