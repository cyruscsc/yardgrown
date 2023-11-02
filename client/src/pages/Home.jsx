import { endpoints, routes } from '../constants';
import { useEffect, useState } from 'react';
import ListingCard from '../components/ListingCard';
import seeding from '../assets/seeding.jpg';
import { homePageText } from '../text';
import PageLink from '../components/PageLink';

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
    <main>
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
          <PageLink
            to={routes.market}
            label='Explore the market'
            position='start'
          />
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
          <PageLink
            to={routes.market + `?sort=createdAt&order=desc`}
            label='Discover more treasures'
            position='end'
          />
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
              <PageLink
                to={routes.about}
                label='Learn more about us'
                position='start'
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
