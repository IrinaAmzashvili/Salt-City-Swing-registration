import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import styles from "./ProfileButton.module.css";

const ProfileButton = ({ user }) => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <div>
      <button
        className={`link-button ${styles.userButton}`}
        onClick={openMenu}
        // onMouseOver={openMenu}
        // onMouseLeave={() => setShowMenu(false)}
      >
        <i className="fas fa-user-circle"></i>
        <span>Welcome, {user.firstName}!</span>
      </button>
      {showMenu && (
        <div className={styles.dropdownDiv}>
          <ul className={styles.profileDropdown}>
            <li>
              <a href=''>My Classes</a>
            </li>
            <li>
              <a href=''>Liked</a>
            </li>
            <li>
              <a href=''>Account Settings</a>
            </li>
            <li>
              <button className={`link-button ${styles.logoutButton}`} onClick={logout}>Log Out</button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileButton;
