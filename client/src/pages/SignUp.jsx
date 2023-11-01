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

export default function SignUp() {
  const [formData, setFormData] = useState({});
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
      const res = await fetch(endpoints.signUp, {
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
        username: '',
        email: '',
        password: '',
      });
      dispatch(userActionSuccess(data));
      navigate(routes.signIn);
    } catch (error) {
      dispatch(userActionFailure(error.message));
    }
  };

  return (
    <main className='auth-container'>
      <h1 className='title text-center'>Welcome to the YG community!</h1>
      <form onSubmit={handleSubmit} className='auth-form'>
        <input
          type='text'
          placeholder='Username'
          value={formData.username}
          onChange={handleChange}
          id='username'
          className='auth-input'
        />
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
          {loading ? 'Loading' : 'Sign Up'}
        </button>
        <OAuth />
      </form>
      <div className='auth-link-container'>
        <p>Have an account?</p>
        <Link to={routes.signIn} className='auth-link'>
          Sign in
        </Link>
      </div>
      {error && <p className='text-pink'>{error}</p>}
    </main>
  );
}
