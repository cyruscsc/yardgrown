import { categories } from '../constants';

export default function Create() {
  return (
    <main className='max-w-7xl px-4 mx-auto'>
      <h1 className='title'>Bring a product to the market</h1>
      <form className='flex flex-col md:flex-row gap-4'>
        <div className='create-form-section'>
          <input
            type='text'
            placeholder='Title'
            minLength={1}
            maxLength={60}
            required
            id='title'
            className='create-input'
          />
          <textarea
            type='text'
            placeholder='Description'
            rows={3}
            minLength={1}
            maxLength={160}
            required
            id='description'
            className='create-input'
          />
          <div className='create-input-container'>
            <label htmlFor='category'>Category: </label>
            <select required id='category' className='create-input'>
              {categories.map((category) => (
                <option value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
            <label htmlFor='price'>Price: </label>
            <input
              type='number'
              placeholder='Price'
              min={0}
              max={1000}
              required
              id='price'
              className='create-input'
            />
          </div>
          <div className='create-input-container'>
            <div className='create-input flex justify-start gap-4 md:gap-8'>
              <div className='flex gap-2'>
                <input type='checkbox' id='delivery' className='w-4' />
                <label htmlFor='delivery'>Delivery</label>
              </div>
              <div className='flex gap-2'>
                <input type='checkbox' id='pickup' className='w-4' />
                <label htmlFor='pickup'>Pickup</label>
              </div>
            </div>
            <input
              type='text'
              placeholder='City'
              id='city'
              className='create-input'
            />
          </div>
          <div className='create-input-container'>
            <input
              type='text'
              placeholder='Phone number'
              id='phone'
              className='create-input'
            />
          </div>
          <div className='create-input-container'>
            <input
              type='email'
              placeholder='Email'
              id='email'
              className='create-input'
            />
          </div>
        </div>
        <div className='create-form-section'>
          <label htmlFor='imageUrls' className='px-3'>
            Product images (max: 6):
          </label>
          <div className='create-input-container'>
            <input
              type='file'
              accept='image/*'
              required
              multiple
              id='imageUrls'
              className='create-input'
            />
            <button
              type='button'
              className='rounded-lg p-3 font-medium uppercase border border-leaves text-leaves hover:bg-leaves hover:text-snow duration-300'
            >
              Upload
            </button>
          </div>
          <button className='auth-button'>Create Listing</button>
        </div>
      </form>
    </main>
  );
}
