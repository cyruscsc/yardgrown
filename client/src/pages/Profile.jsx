import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  userActionStart,
  userActionSuccess,
  userActionFailure,
} from '../redux/user/userSlice';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { endpoints } from '../constants';

export default function Profile() {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (file) handleFileUpload(file);
  }, [file]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(userActionStart());
      const res = await fetch(endpoints.update + `/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setFormData({});
        dispatch(userActionFailure(data.message));
        return;
      }
      setFormData({});
      dispatch(userActionSuccess(data));
      setSuccess(true);
    } catch (error) {
      dispatch(userActionFailure(error.message));
    }
  };

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

  const handleSignOut = async () => {
    try {
      const res = await fetch(endpoints.signOut);
      const data = res.json();
      if (data.success === false) {
        setFormData({});
        dispatch(userActionFailure(data.message));
        return;
      }
      dispatch(userActionSuccess(data));
    } catch (error) {
      dispatch(userActionFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(userActionStart());
      const res = await fetch(endpoints.delete + `/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        setFormData({});
        dispatch(userActionFailure(data.message));
        return;
      }
      dispatch(userActionSuccess(data));
    } catch (error) {
      dispatch(userActionFailure(error.message));
    }
  };

  return (
    <div className='auth-container'>
      <h1 className='title text-center'>Profile</h1>
      <form onSubmit={handleSubmit} className='auth-form'>
        <img
          src={formData.avatar || currentUser.avatar}
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
          defaultValue={currentUser.username}
          value={formData.username}
          onChange={handleChange}
          id='username'
          className='auth-input'
        />
        <input
          type='email'
          placeholder='Email'
          defaultValue={currentUser.email}
          value={formData.email}
          onChange={handleChange}
          id='email'
          className='auth-input'
        />
        <input
          type='password'
          placeholder='Password'
          value={formData.password}
          onChange={handleChange}
          id='password'
          className='auth-input'
        />
        <button type='submit' disabled={loading} className='auth-button'>
          {loading ? 'Loading' : 'Update'}
        </button>
      </form>
      <div className='flex items-center justify-between my-4'>
        <span onClick={handleDeleteUser} className='cursor-pointer text-pink'>
          Delete account
        </span>
        <span onClick={handleSignOut} className='cursor-pointer text-grullo'>
          Sign out
        </span>
      </div>
      {success && <p className='text-leaves'>User updated successfully!</p>}
      {error && <p className='text-pink'>{error}</p>}
    </div>
  );
}
