import { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./UserAccount.module.css";

const CloseAccount = () => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
      e.preventDefault();
      // pop up modal to confirm delete
      // confirm password, delete account
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
      <div className={styles.inputDivs}>
        <label>
          Enter Password
          <input className={styles.input} type="password" />
        </label>
      </div>
      <dutton type="submit" className={`${styles.accountDeleteBtn} ctaButton`}>Close Account</dutton>
    </form>
  );
};

export default CloseAccount;
