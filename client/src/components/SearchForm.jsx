import { useNavigate } from 'react-router-dom';
import { categories, routes } from '../constants';
import { FaBagShopping, FaMagnifyingGlass, FaTruckFast } from 'react-icons/fa6';
import { useEffect, useState } from 'react';

export default function SearchForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const allParams = {};
    urlParams.forEach((val, key) => (allParams[key] = val));
    setFormData(allParams);
  }, [window.location.search]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleClick = (key) => {
    setFormData(
      formData[key]
        ? { ...formData, [key]: false }
        : { ...formData, [key]: true }
    );
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    for (const key in formData)
      formData[key] ? urlParams.set(key, formData[key]) : urlParams.delete(key);
    const queryParams = urlParams.toString();
    navigate(routes.market + `?${queryParams}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className='flex items-center justify-center gap-2 text-base'
    >
      <div className='flex flex-col lg:flex-row'>
        <div className='flex items-center justify-center'>
          <input
            type='text'
            placeholder='Search'
            value={formData.keywords || ''}
            onChange={handleChange}
            id='keywords'
            className='bg-stream px-2 py-1 rounded-s-lg h-10 w-full  focus:outline-none'
          />
          <select
            id='category'
            value={formData.category || ''}
            onChange={handleChange}
            className={`bg-stream text-xanadu px-2 py-1 h-10 w-32 focus:outline-none ${
              formData.category && 'text-wenge'
            }`}
          >
            <option value=''>Category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
          <button
            type='submit'
            className='bg-stream px-2 py-1 rounded-e-lg h-10'
          >
            <FaMagnifyingGlass className='fill-xanadu hover:fill-wenge duration-300' />
          </button>
        </div>
        <div className='flex items-center justify-start lg:justify-center'>
          <input
            type='text'
            placeholder='City'
            value={formData.city || ''}
            onChange={handleChange}
            id='city'
            className='bg-transparent px-2 py-1 h-10 w-full lg:w-32 focus:outline-none'
          />
          <div className='flex items-center justify-center gap-8'>
            <button
              type='button'
              id='delivery'
              onClick={() => handleClick('delivery')}
              className='text-2xl'
            >
              <FaTruckFast
                className={`${
                  formData.delivery ? 'fill-wenge' : 'fill-xanadu'
                } duration-150`}
              />
            </button>
            <button
              type='button'
              id='pickup'
              onClick={() => handleClick('pickup')}
              className='text-2xl'
            >
              <FaBagShopping
                className={`${
                  formData.pickup ? 'fill-wenge' : 'fill-xanadu'
                } duration-150`}
              />
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
