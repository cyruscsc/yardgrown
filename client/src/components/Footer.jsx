import { Link } from 'react-router-dom';
import logo from '../assets/yardgrown-snow.png';
import { routes } from '../constants';

export default function Footer() {
  return (
    <footer className='bg-wenge font-light text-sm'>
      <div className='flex flex-col items-center justify-center gap-4 max-w-7xl mx-auto px-4 py-8'>
        <div className='flex items-center justify-center gap-8 w-full'>
          <ul className='flex flex-col sm:flex-row items-end sm:items-center justify-center gap-2 sm:gap-4 w-60'>
            <li>
              <Link to={routes.market} className='footer-link'>
                Market
              </Link>
            </li>
            <li>
              <Link to={routes.about} className='footer-link'>
                About
              </Link>
            </li>
            <li>
              <Link to={routes.profile} className='footer-link'>
                Profile
              </Link>
            </li>
          </ul>
          <img src={logo} alt='YardGrown Logo' className='w-8 h-8' />
          <ul className='flex flex-col sm:flex-row items-start sm:items-center justify-center gap-2 sm:gap-4 w-60'>
            <li>
              <Link
                to='https://facebook.com'
                target='_blank'
                className='footer-link'
              >
                Facebook
              </Link>
            </li>
            <li>
              <Link
                to='https://instagram.com'
                target='_blank'
                className='footer-link'
              >
                Instagram
              </Link>
            </li>
            <li>
              <Link
                to='https://twitter.com'
                target='_blank'
                className='footer-link'
              >
                Twitter
              </Link>
            </li>
          </ul>
        </div>
        <p className='text-snow'>&copy; {new Date().getFullYear()} YardGrown</p>
      </div>
    </footer>
  );
}
