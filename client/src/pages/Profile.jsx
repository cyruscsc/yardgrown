import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    username: currentUser.username,
    email: currentUser.email,
    password: '',
  });
  return (
    <div className='auth-container'>
      <h1 className='title'>Profile</h1>
      <form className='auth-form'>
        <img src={currentUser.avatar} className='avatar h-48 w-48 mx-auto' />
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
