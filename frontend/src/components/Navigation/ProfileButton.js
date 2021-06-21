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
    <button
      className={`link-button ${styles.userButton}`}
      onClick={openMenu}
      // onMouseOver={openMenu}
      // onMouseLeave={() => setShowMenu(false)}
    >
      <div className={styles.userIconWelcome}>
        <i className="fas fa-user-circle"></i>
        <span className={styles.welcomeMessage}>
          Welcome, {user.firstName}!
        </span>
        {showMenu && (
          <div className={styles.dropdownDiv}>
            <ul className={styles.profileDropdown}>
              <a href={`/user/${user.id}`}>My Classes</a>
              {/* <a href={`/user/${user.id}`}>Liked</a> */}
              <a href={`/user/${user.id}/account`}>Account Settings</a>
              <div
                className={`${styles.logoutButton}`}
                onClick={logout}
              >
                Log Out
              </div>
            </ul>
          </div>
        )}
      </div>
    </button>
  );
};

export default ProfileButton;
