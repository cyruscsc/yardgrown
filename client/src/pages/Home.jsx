import { Link } from 'react-router-dom';
import { endpoints, routes } from '../constants';
import { FaArrowRight } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import ListingCard from '../components/ListingCard';

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
            Harvesting <span className='text-pink'>happiness</span>,
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
        <div className='max-w-7xl m-auto px-4 py-8'>
          <h1 className='title text-center'>Newest Listings</h1>
          <div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 py-4'>
              {newListings.map((listing) => (
                <ListingCard key={listing._id} listing={listing} />
              ))}
            </div>
          </div>
        </div>
      </section>
      <section id='about'>
        <div></div>
      </section>
    </div>
  );
}
