import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';

const Navigation = () => {
  const sessionUser = useSelector((store) => store.session.user)

  let sessionLinks;
  if (sessionUser) {
      sessionLinks = (
          <ProfileButton user={sessionUser} />
        //   logout button?
      );
  } else {
      sessionLinks = (
          <>
            <NavLink to='/login'>Log In</NavLink>
            <NavLink to='/signup'>Sign Up</NavLink>
          </>
      );
  }

  return (
    <nav>
      <ul>
        <NavLink exact to="/">Home</NavLink>
        {sessionLinks}
      </ul>
    </nav>
  );
};

export default Navigation;
