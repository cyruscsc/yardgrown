import { useState } from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../constants';
import { FaBars, FaMagnifyingGlass, FaXmark } from 'react-icons/fa6';
import logo from '../assets/yardgrown-wenge.png';

export default function Header() {
  const [dropdownShown, setDropdownShown] = useState(false);

  const toggleDropdown = () => setDropdownShown(!dropdownShown);
  const hideDropdown = () => setDropdownShown(false);

  return (
    <header className='bg-leaves text-wenge text-base font-medium'>
      <div className='flex items-center justify-between max-w-7xl mx-auto px-8 py-4 max-md:flex-col max-md:items-start'>
        <Link
          to={routes.home}
          className='flex gap-2 items-center justify-start text-xl'
        >
          <img className='h-10' src={logo} alt='YardGrown Logo' />
          <h1>
            Yard<span className='text-grullo'>Grown</span>
          </h1>
        </Link>

        <nav className={`${dropdownShown ? 'max-md:w-full' : ''}`}>
          <Link className='absolute top-6 right-10 text-2xl invisible max-md:visible nav-hover'>
            {dropdownShown ? (
              <FaXmark onClick={toggleDropdown} />
            ) : (
              <FaBars onClick={toggleDropdown} />
            )}
          </Link>
          <ul
            className={`flex items-center justify-center max-md:flex-col max-md:items-start max-md:w-full gap-4 ${
              dropdownShown ? 'max-md:flex max-md:mt-4' : 'max-md:hidden'
            }`}
          >
            <li>
              <form className='flex items-center justify-center border-2 border-wenge rounded-lg px-2 py-1 text-base'>
                <input
                  type='text'
                  placeholder='Search'
                  className='bg-transparent w-full focus:outline-none'
                />
                <FaMagnifyingGlass />
              </form>
            </li>
            <li className='nav-hover'>
              <Link to={routes.about} onClick={hideDropdown}>
                About
              </Link>
            </li>
            <li className='nav-hover'>
              <Link to={routes.profile} onClick={hideDropdown}>
                Profile
              </Link>
            </li>
            <li className='nav-hover'>
              <Link to={routes.signUp} onClick={hideDropdown}>
                Sign Up
              </Link>
            </li>
            <li className='nav-hover'>
              <Link to={routes.signIn} onClick={hideDropdown}>
                Sign In
              </Link>
            </li>
            <li className='nav-hover'>
              <Link to={routes.signOut} onClick={hideDropdown}>
                Sign Out
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
