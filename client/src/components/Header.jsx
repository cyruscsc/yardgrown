import { useState } from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../constants';
import {
  FaMagnifyingGlass,
  FaRegCircleUser,
  FaRegLightbulb,
} from 'react-icons/fa6';
import logo from '../assets/yardgrown-wenge.png';

export default function Header() {
  const [dropdownShown, setDropdownShown] = useState(false);

  const toggleDropdown = () => setDropdownShown(!dropdownShown);
  const hideDropdown = () => setDropdownShown(false);

  return (
    <header className='bg-leaves text-wenge text-base font-medium'>
      <div className='flex items-center justify-between max-w-7xl mx-auto px-8 py-4'>
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
            className='bg-transparent w-32 sm:w-64 md:w-96 focus:outline-none'
          />
          <FaMagnifyingGlass />
        </form>
        <nav>
          <ul className='flex items-center justify-center gap-8 text-xl'>
            <li className='nav-hover'>
              <Link to={routes.about} onClick={hideDropdown}>
                <FaRegLightbulb />
              </Link>
            </li>
            <li className='nav-hover'>
              <Link to={routes.profile} onClick={hideDropdown}>
                <FaRegCircleUser />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
