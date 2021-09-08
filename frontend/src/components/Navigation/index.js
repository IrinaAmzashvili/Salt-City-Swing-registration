import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import * as sessionActions from "../../store/session";
import styles from "./Navigation.module.css";
import { BannerPic, Logo } from '../../image/image';

const Navigation = ({ isLoaded }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((store) => store.session.user);

  const loginDemoUser = (e) => {
    e.preventDefault();

    return dispatch(sessionActions.loginDemo()).catch(async (res) => {
      await res.json();
    });
  };

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <>
        <LoginFormModal linkText={'Log In'} />
        <NavLink to="/signup">Sign Up</NavLink>
        <button className="link-button" onClick={loginDemoUser}>
          Demo User
        </button>
      </>
    );
  }

  return (
    <nav>
      <div className={styles.bannerDiv}>
        <div className={styles.bannerImageDiv}>
          <img
            className={styles.bannerImage}
            src={BannerPic()}
            alt="Banner with dancers"
          />
        </div>
        <div className={styles.logoDiv}>
          <a href="/">
            <img
              className={styles.logo}
              src={Logo()}
              alt="Salt City Swing Logo"
            ></img>
          </a>
        </div>
      </div>
      <div className={styles.navDiv}>
        <div className={styles.logoDiv}></div>
        <div className={styles.searchDiv}></div>
        <ul className={styles.navlinks}>
          <NavLink exact to="/">
            Classes
          </NavLink>
          {isLoaded && sessionLinks}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
