import { useNavigate } from 'react-router-dom';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import { routes } from '../constants';

export default function SearchBar() {
  const navigate = useNavigate();
  const [keywords, setKeywords] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.get('keywords') && setKeywords(urlParams.get('keywords'));
  }, [window.location.search]);

  const handleChange = (e) => setKeywords(e.target.value);

  const handleSearch = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    keywords
      ? urlParams.set('keywords', keywords)
      : urlParams.delete('keywords');
    navigate(routes.market + `?${urlParams.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className='flex items-center justify-center text-base md:w-72 lg:w-96'
    >
      <input
        type='text'
        placeholder='Search'
        value={keywords}
        onChange={handleChange}
        id='keywords'
        className='bg-stream px-2 py-1 rounded-s-lg h-10 w-full focus:outline-none'
      />
      <button type='submit' className='bg-stream px-2 py-1 rounded-e-lg h-10'>
        <FaMagnifyingGlass className='fill-xanadu hover:fill-wenge duration-150' />
      </button>
    </form>
  );
}
