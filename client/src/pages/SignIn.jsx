import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { endpoints, routes } from '../constants';

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
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
      setError(data.message);
      setLoading(false);
      return;
    }
    setFormData({
      email: '',
      password: '',
    });
    setError(null);
    setLoading(false);
    navigate(routes.home);
  };

  return (
    <div className='auth-container'>
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
      </form>
      <div className='auth-link-container'>
        <p>New to YG?</p>
        <Link to={routes.signUp} className='auth-link'>
          Sign up
        </Link>
      </div>
      {error && <p className=' text-pink'>{error}</p>}
    </div>
  );
}
