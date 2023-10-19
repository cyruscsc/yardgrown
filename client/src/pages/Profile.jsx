import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState(false);
  const [formData, setFormData] = useState({
    username: currentUser.username,
    email: currentUser.email,
    password: '',
    avatar: currentUser.avatar,
  });

  useEffect(() => {
    if (file) handleFileUpload(file);
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + '-' + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(Math.round(progress));
      },
      (error) => setUploadError(true),
      () =>
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        )
    );
  };

  return (
    <div className='auth-container'>
      <h1 className='title text-center'>Profile</h1>
      <form className='auth-form'>
        <img
          src={formData.avatar}
          onClick={() => fileRef.current.click()}
          className='avatar h-48 w-48 mx-auto'
        />
        <input
          type='file'
          accept='image/*'
          hidden
          ref={fileRef}
          onChange={(e) => setFile(e.target.files[0])}
        />
        <div className='text-center'>
          {uploadProgress && uploadProgress < 100 ? (
            <p className='text-grullo'>{uploadProgress}%</p>
          ) : (uploadProgress === 100) & !uploadError ? (
            <p className='text-leaves'>Upload completed!</p>
          ) : uploadError ? (
            <p className='text-pink'>Upload failed, please try again later!</p>
          ) : null}
        </div>
        <input
          type='text'
          placeholder='Username'
          value={formData.username}
          id='username'
          className='auth-input'
        />
        <input
          type='email'
          placeholder='Email'
          value={formData.email}
          id='email'
          className='auth-input'
        />
        <input
          type='password'
          placeholder='Password'
          value={formData.password}
          id='password'
          className='auth-input'
        />
        <button type='submit' className='auth-button'>
          Update
        </button>
      </form>
      <div className='flex items-center justify-between my-4'>
        <span className='cursor-pointer text-pink'>Delete account</span>
        <span className='cursor-pointer text-grullo'>Sign out</span>
      </div>
    </div>
  );
}
