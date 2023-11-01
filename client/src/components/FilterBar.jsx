import { categories } from '../constants';

export default function FilterBar(props) {
  return (
    <div className='flex items-center justify-start flex-wrap gap-4 my-4'>
      <div className='flex items-center justify-center gap-4'>
        <select
          id='category'
          value={props.formData.category || ''}
          onChange={props.handleChange}
          className={`w-32 p-2 border border-linen rounded-lg focus:outline-none ${
            props.formData.category ? 'text-wenge' : 'text-gray'
          }`}
        >
          <option value=''>Category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
        <input
          type='text'
          placeholder='City'
          value={props.formData.city || ''}
          onChange={props.handleChange}
          id='city'
          className={`w-32 p-2 border border-linen rounded-lg focus:outline-none ${
            props.formData.city ? 'text-wenge' : 'text-gray'
          }`}
        />
      </div>
      <div className='flex items-center justify-center gap-4'>
        <div className='flex items-center justify-center gap-2 px-2'>
          <input
            type='checkbox'
            checked={props.formData.delivery}
            onChange={props.handleChange}
            id='delivery'
            className='w-4 h-4'
          />
          <label
            htmlFor='delivery'
            className={`${
              props.formData.delivery ? 'text-wenge' : 'text-gray'
            }`}
          >
            Delivery
          </label>
        </div>
        <div className='flex items-center justify-center gap-2'>
          <input
            type='checkbox'
            checked={props.formData.pickup}
            onChange={props.handleChange}
            id='pickup'
            className='w-4 h-4'
          />
          <label
            htmlFor='pickup'
            className={`${props.formData.pickup ? 'text-wenge' : 'text-gray'}`}
          >
            Pickup
          </label>
        </div>
      </div>
      <div className='flex items-center justify-center gap-4'>
        <select
          value={props.formData.sort || ''}
          onChange={props.handleChange}
          id='sort'
          className={`w-32 p-2 border border-linen rounded-lg focus:outline-none ${
            props.formData.sort ? 'text-wenge' : 'text-gray'
          }`}
        >
          <option value=''>Sort by</option>
          <option value='createdAt'>Date</option>
          <option value='price'>Price</option>
        </select>
        <select
          value={props.formData.order || ''}
          disabled={!props.formData.sort}
          onChange={props.handleChange}
          id='order'
          className={`w-32 p-2 border border-linen rounded-lg focus:outline-none ${
            props.formData.order ? 'text-wenge' : 'text-gray'
          }`}
        >
          <option value=''>Order from</option>
          <option value='asc'>
            {props.formData.sort === 'price' ? 'Low to High' : 'Old to new'}
          </option>
          <option value='desc'>
            {props.formData.sort === 'price' ? 'High to Low' : 'New to old'}
          </option>
        </select>
      </div>
      {props.loading && <span className='text-leaves'>Loading...</span>}
      {props.error && <span className='text-pink'>Something went wrong!</span>}
    </div>
  );
}
