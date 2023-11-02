import { FaBagShopping, FaLocationDot, FaTruckFast } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { routes } from '../constants';

export default function ListingCard(props) {
  return (
    <article className='listing-card draw-card'>
      <img
        src={props.listing.imageUrls[0]}
        alt={props.listing.title}
        className='h-64 w-full object-cover object-center'
      />
      <div className='flex flex-col flex-auto items-start justify-start gap-4 w-full p-3'>
        <Link to={routes.listing + `/${props.listing._id}`}>
          <h2 className='font-bold text-lg my-2 line-clamp-1'>
            {props.listing.title}
          </h2>
        </Link>
        <span className='text-gray'>
          {props.listing.category.charAt(0).toUpperCase() +
            props.listing.category.slice(1)}
        </span>
        <div className='line-clamp-3 flex-auto'>
          {props.listing.description}
        </div>
        <div className='flex items-center justify-start gap-16 w-full'>
          <span className='text-pink'>${props.listing.price.toFixed(2)}</span>

          <span className='text-gray'>
            {new Date(props.listing.createdAt).toLocaleDateString()}
          </span>
        </div>
        <div className='flex items-center justify-start gap-4'>
          <div className='flex items-center gap-2'>
            <FaLocationDot className='fill-grullo' />
            <span className='text-grullo'>{props.listing.city}</span>
          </div>
          {props.listing.delivery && (
            <div className='flex items-center gap-2'>
              <FaTruckFast className='fill-xanadu' />
              <span className='text-xanadu'>Delivery</span>
            </div>
          )}
          {props.listing.pickup && (
            <div className='flex items-center gap-2'>
              <FaBagShopping className='fill-xanadu' />
              <span className='text-xanadu'>Pickup</span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
