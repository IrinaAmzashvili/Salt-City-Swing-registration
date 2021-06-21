import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import styles from "./Navigation.module.css";

const Navigation = ({ isLoaded }) => {
  const sessionUser = useSelector((store) => store.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink to="/signup">Sign Up</NavLink>
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
