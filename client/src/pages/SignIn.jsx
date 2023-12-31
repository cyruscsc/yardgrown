import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { endpoints, routes } from '../constants';
import { useDispatch, useSelector } from 'react-redux';
import {
  userActionStart,
  userActionSuccess,
  userActionFailure,
} from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { error, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      const res = await fetch(endpoints.signIn, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setFormData({
          ...formData,
          password: '',
        });
        dispatch(userActionFailure(data.message));
        return;
      }
      setFormData({
        email: '',
        password: '',
      });
      dispatch(userActionSuccess(data));
      navigate(routes.home);
    } catch (error) {
      dispatch(userActionFailure(error.message));
    }
  };

  return (
    <main className='auth-container'>
      <h1 className='title text-center'>Welcome back!</h1>
      <form onSubmit={handleSubmit} className='auth-form'>
        <input
          type='email'
          placeholder='Email'
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
          {loading ? 'Loading' : 'Sign In'}
        </button>
        <OAuth />
      </form>
      <div className='auth-link-container'>
        <p>New to YG?</p>
        <Link to={routes.signUp} className='auth-link'>
          Sign up
        </Link>
      </div>
      {error && <p className='text-pink'>{error}</p>}
    </main>
  );
}
