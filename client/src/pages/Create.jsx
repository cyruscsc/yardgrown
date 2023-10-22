import { useState } from 'react';
import { categories } from '../constants';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';

export default function Create() {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [formData, setFormData] = useState({
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
          setUploadError('Upload failed, maximum 2 MB per image');
        });
    } else {
      setUploading(false);
      setUploadError('Maximum 6 images only');
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
              onChange={(e) => setFiles(e.target.files)}
              id='images'
              className='create-input'
            />
            <button
              type='button'
              disabled={uploading}
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
                key={index}
                className='flex items-center justify-between border border-leaves rounded-lg p-3 '
              >
                <img
                  src={url}
                  alt='Product Image'
                  className='h-24 w-24 object-contain rounded-lg'
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
          <button className='auth-button'>Create Listing</button>
        </div>
      </form>
    </main>
  );
}
