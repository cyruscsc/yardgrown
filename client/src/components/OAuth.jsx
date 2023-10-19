import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { endpoints, routes } from '../constants';
import { useDispatch } from 'react-redux';
import {
  userActionFailure,
  userActionStart,
  userActionSuccess,
} from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleOAuthClick = async () => {
    try {
      dispatch(userActionStart());
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
        dispatch(userActionFailure(data.message));
        return;
      }
      dispatch(userActionSuccess(data));
      navigate(routes.home);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button type='button' onClick={handleOAuthClick} className='oauth-button'>
      Continue with Google
    </button>
  );
}
