import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import styles from './Navigation.module.css';

const Navigation = ({ isLoaded }) => {
  const sessionUser = useSelector((store) => store.session.user);

  let sessionLinks;
  if (sessionUser) {
      sessionLinks = (
          <ProfileButton user={sessionUser} />
      );
  } else {
      sessionLinks = (
          <>
            <LoginFormModal />
            <NavLink to='/signup'>Sign Up</NavLink>
          </>
      );
  }

  return (
    <nav>
      <ul>
        <NavLink exact to="/">Home</NavLink>
        {isLoaded && sessionLinks}
      </ul>
    </nav>
  );
};

export default Navigation;
