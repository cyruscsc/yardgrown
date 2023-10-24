import { useState } from 'react';
import { categories, endpoints } from '../constants';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function CreateListing() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    delivery: false,
    pickup: false,
    city: '',
    phone: '',
    email: '',
    imageUrls: [],
  });

  const handleFilesUpload = () => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setUploadError(false);
      const promises = [];
      for (let i = 0; i < files.length; i++) promises.push(storeFile(files[i]));
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setUploading(false);
          setUploadError(false);
        })
        .catch((err) => {
          setUploading(false);
          setUploadError('Upload failed, please try again');
        });
    } else {
      setUploading(false);
      setUploadError('Please upload at most 6 images');
    }
  };

  const storeFile = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + '-' + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {},
        (error) => reject(error),
        () =>
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
            resolve(downloadURL)
          )
      );
    });
  };

  const handleFileDelete = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    if (
      e.target.type === 'text' ||
      e.target.type === 'textarea' ||
      e.target.type === 'number' ||
      e.target.type === 'email' ||
      e.target.type === 'select-one'
    )
      setFormData({ ...formData, [e.target.id]: e.target.value });
    if (e.target.type === 'checkbox')
      setFormData({ ...formData, [e.target.id]: e.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      if (formData.imageUrls.length < 1) {
        setError('Please upload at least 1 image');
        setLoading(false);
        return;
      }
      const res = await fetch(endpoints.createListing, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, userRef: currentUser._id }),
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      navigate(`/market/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <main className='max-w-7xl px-4 mx-auto'>
      <h1 className='title'>Bring a product to the market</h1>
      <form onSubmit={handleSubmit} className='flex flex-col md:flex-row gap-4'>
        <div className='create-form-section'>
          <input
            type='text'
            placeholder='Title'
            minLength={1}
            maxLength={60}
            required
            value={formData.title}
            onChange={handleChange}
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
            value={formData.description}
            onChange={handleChange}
            id='description'
            className='create-input'
          />
          <div className='create-input-container'>
            <select
              required
              id='category'
              value={formData.category}
              onChange={handleChange}
              className='create-input'
            >
              <option value=''>Category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
            <input
              type='number'
              placeholder='Price'
              min={0}
              max={1000}
              step={0.05}
              required
              value={formData.price}
              onChange={handleChange}
              id='price'
              className='create-input'
            />
          </div>
          <div className='create-input-container'>
            <div className='create-input flex justify-start gap-4 md:gap-8'>
              <div className='flex gap-2'>
                <input
                  type='checkbox'
                  checked={formData.delivery}
                  onChange={handleChange}
                  id='delivery'
                  className='w-4'
                />
                <label htmlFor='delivery'>Delivery</label>
              </div>
              <div className='flex gap-2'>
                <input
                  type='checkbox'
                  checked={formData.pickup}
                  onChange={handleChange}
                  id='pickup'
                  className='w-4'
                />
                <label htmlFor='pickup'>Pickup</label>
              </div>
            </div>
            <input
              type='text'
              placeholder='City'
              value={formData.city}
              onChange={handleChange}
              id='city'
              className='create-input'
            />
          </div>
          <div className='create-input-container'>
            <input
              type='text'
              placeholder='Phone number'
              value={formData.phone}
              onChange={handleChange}
              id='phone'
              className='create-input'
            />
          </div>
          <div className='create-input-container'>
            <input
              type='email'
              placeholder='Email'
              value={formData.email}
              onChange={handleChange}
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
              onChange={(e) => setFiles(e.target.files)}
              id='images'
              className='create-input'
            />
            <button
              type='button'
              disabled={uploading || loading}
              onClick={handleFilesUpload}
              className='rounded-lg p-3 font-medium uppercase border border-leaves text-leaves hover:bg-leaves hover:text-snow duration-300'
            >
              {uploading ? 'Uploading' : 'Upload'}
            </button>
          </div>
          {uploadError && <p className='text-pink px-3'>{uploadError}</p>}
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className='flex items-center justify-between border border-linen rounded-lg p-3 '
              >
                <img
                  src={url}
                  alt='Product Image'
                  className='h-24 w-36 object-contain object-center rounded-lg'
                />
                <button
                  type='button'
                  onClick={() => handleFileDelete(index)}
                  className='rounded-lg p-3 font-medium uppercase border border-pink text-pink hover:bg-pink hover:text-snow duration-300'
                >
                  Delete
                </button>
              </div>
            ))}
          <button disabled={uploading || loading} className='auth-button'>
            {loading ? 'Loading' : 'Create Listing'}
          </button>
          {error && <p className='text-pink'>{error}</p>}
        </div>
      </form>
    </main>
  );
}
