import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { endpoints, routes } from '../constants';
import { useDispatch } from 'react-redux';
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleOAuthClick = async () => {
    try {
      dispatch(signInStart());
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const res = await fetch(endpoints.google, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          displayName: result.user.displayName,
          email: result.user.email,
          avatar: result.user.photoURL,
        }),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate(routes.home);
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };
  return (
    <button type='button' onClick={handleOAuthClick} className='oauth-button'>
      Continue with Google
    </button>
  );
}
