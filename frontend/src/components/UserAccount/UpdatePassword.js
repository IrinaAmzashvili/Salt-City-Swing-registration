import { useState } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import styles from "./UserAccount.module.css";

const UpdatePassword = ({ user }) => {
  const dispatch = useDispatch();
  const [currPassword, setCurrPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [saved, setSaved] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedPassword = {
      id: user?.id,
      currPassword,
      newPassword,
    };

    if (!currPassword) return setErrors(['Current password required.']);
    if (newPassword && newPassword === repeatPassword) {
      setErrors([]);

      await dispatch(
        sessionActions.updatePassword(updatedPassword, user?.id)
      ).then(() => {
        setSaved(true);
        setCurrPassword('');
        setNewPassword('');
        setRepeatPassword('');
        displaySavedConfirmation();
      }).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
    } else {
      return setErrors([
        "Repeat password and new password must match.",
      ]);
    }
  };

  const displaySavedConfirmation = () => {
    setTimeout(() => {
      setSaved(false);
    }, 3000);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {errors && (
        <div className={`${styles.accountErrors} errorsDiv`}>
          <ul className={styles.errorsUl}>
            {errors.map((error, i) => (
              <li key={i}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      <div className={styles.updatePasswordDiv}>
        <div className={styles.inputDivs}>
          <label>
            Current Password
            <input
              className={styles.input}
              type="password"
              value={currPassword}
              onChange={(e) => setCurrPassword(e.target.value)}
            />
          </label>
        </div>
        <div className={styles.inputDivs}>
          <label>
            New Password
            <input
              className={styles.input}
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </label>
        </div>
        <div className={styles.inputDivs}>
          <label>
            Repeat Password
            <input
              className={styles.input}
              type="password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
          </label>
        </div>
        <div>
          <button
            type="submit"
            className={`${styles.accountSaveBtn} ctaButton`}
            disabled={user?.id === 1 ? true : false}
            title={user?.id === 1 ? 'Demo account information cannot be updated' : null}
          >
            Save
          </button>
          <p className={saved ? `${styles.visible}` : `${styles.hidden}`}>New password saved<i className={`${styles.checkMark} fas fa-check`}></i></p>
        </div>
      </div>
    </form>
  );
};

export default UpdatePassword;
