import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../constants';

export default function SignUp() {
  return (
    <div className='auth-container'>
      <h1 className='title text-center'>Welcome to the YG community!</h1>
      <form className='auth-form'>
        <input type='text' placeholder='Username' className='auth-input' />
        <input type='email' placeholder='Email' className='auth-input' />
        <input type='password' placeholder='Password' className='auth-input' />
        <button type='submit' className='auth-button'>
          Sign Up
        </button>
      </form>
      <div className='auth-link-container'>
        <p>Have an account?</p>
        <Link to={routes.signIn} className='auth-link'>
          Sign in
        </Link>
      </div>
    </div>
  );
}
