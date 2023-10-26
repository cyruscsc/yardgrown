import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { routes } from '../constants';
import {
  FaArrowRightToBracket,
  FaMagnifyingGlass,
  FaRegPenToSquare,
  FaRegRectangleList,
} from 'react-icons/fa6';
import logo from '../assets/yardgrown-wenge.png';
import { useEffect, useState } from 'react';

export default function Header() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [keywords, setKeywords] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('keywords', keywords);
    const queryParams = urlParams.toString();
    navigate(routes.market + `/search?${queryParams}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const urlParamsKeywords = urlParams.get('keywords');
    if (urlParamsKeywords) setKeywords(urlParamsKeywords);
  }, [window.location.search]);

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
        <form
          onSubmit={handleSearch}
          className='flex items-center justify-center bg-stream rounded-lg px-2 py-1 text-base'
        >
          <input
            type='text'
            placeholder='Search'
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            id='keywords'
            className='bg-transparent w-28 sm:w-60 md:w-96 focus:outline-none'
          />
          <button type='submit'>
            <FaMagnifyingGlass className='fill-wenge icon-hover' />
          </button>
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
