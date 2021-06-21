import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import * as sessionActions from "../../store/session";
import styles from "./Navigation.module.css";

const Navigation = ({ isLoaded }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((store) => store.session.user);

  const loginDemoUser = (e) => {
    e.preventDefault();
    
    return dispatch(sessionActions.loginDemo()).catch(async (res) => {
      await res.json();
    })
  }

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink to="/signup">Sign Up</NavLink>
        <button
          className='link-button'
          onClick={loginDemoUser}
        >
          Demo User
        </button>
      </>
    );
  }

  return (
    <nav>
      <div className={styles.logoDiv}>
        <a href='/'>
          <img className={styles.logo} src='logo/Salt-City-Swing-Shadow-sans-slogan-trans.png' alt='Salt City Swing Logo'></img>
        </a>
      </div>
      <div className={styles.searchDiv}></div>
      <ul className={styles.navlinks}>
        <NavLink exact to="/">
          Home
        </NavLink>
        {isLoaded && sessionLinks}
      </ul>
    </nav>
  );
};

export default Navigation;
