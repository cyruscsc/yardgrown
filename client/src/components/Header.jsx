import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { routes } from '../constants';
import {
  FaArrowRightToBracket,
  FaMagnifyingGlass,
  FaRegPenToSquare,
  FaRegRectangleList,
} from 'react-icons/fa6';
import logo from '../assets/yardgrown-wenge.png';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <header className='bg-leaves font-medium'>
      <div className='flex items-center justify-between max-w-7xl mx-auto px-4 py-4'>
        <Link
          to={routes.home}
          className='flex gap-2 items-center justify-start text-xl'
        >
          <img className='h-10' src={logo} alt='YardGrown Logo' />
          <h1 className='hidden sm:block'>
            Yard<span className='text-grullo'>Grown</span>
          </h1>
        </Link>
        <form className='flex items-center justify-center bg-stream rounded-lg px-2 py-1 text-base'>
          <input
            type='text'
            placeholder='Search'
            className='bg-transparent w-28 sm:w-60 md:w-96 focus:outline-none'
          />
          <FaMagnifyingGlass className='fill-wenge icon-hover' />
        </form>
        <nav>
          <ul className='flex items-center justify-center gap-4 sm:gap-6 md:gap-8 text-2xl'>
            <li>
              <Link to={routes.createListing}>
                <FaRegPenToSquare className='fill-wenge icon-hover' />
              </Link>
            </li>
            <li>
              <Link to={routes.myListings}>
                <FaRegRectangleList className='fill-wenge icon-hover' />
              </Link>
            </li>
            <li>
              {currentUser ? (
                <Link to={routes.profile}>
                  <img
                    src={currentUser.avatar}
                    alt='profile'
                    className='avatar h-6 w-6'
                  />
                </Link>
              ) : (
                <Link to={routes.signUp}>
                  <FaArrowRightToBracket className='fill-wenge  icon-hover' />
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
