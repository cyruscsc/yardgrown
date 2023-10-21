import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { routes } from './constants';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import About from './pages/About';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import Create from './pages/Create';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={routes.home} element={<Home />} />
        <Route path={routes.about} element={<About />} />
        <Route path={routes.signUp} element={<SignUp />} />
        <Route path={routes.signIn} element={<SignIn />} />
        <Route element={<PrivateRoute />}>
          <Route path={routes.profile} element={<Profile />} />
          <Route path={routes.create} element={<Create />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
