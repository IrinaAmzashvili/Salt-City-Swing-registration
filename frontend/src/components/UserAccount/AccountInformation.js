import { useState } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import styles from "./UserAccount.module.css";

const AccountInformation = ({ user }) => {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [email, setEmail] = useState(user?.email);
  const [mailingList, setMailingList] = useState(user?.mailingList);
  const [errors, setErrors] = useState([]);
  const [saved, setSaved] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedUser = {
      firstName,
      lastName,
      email,
      mailingList,
    };

    setErrors([]);

    await dispatch(sessionActions.updateUser(updatedUser, user?.id))
      .then(() => {
        setSaved(true);
        displaySavedConfirmation();
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  const displaySavedConfirmation = () => {
    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

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
        <label htmlFor="firstName" className={styles.labels}>
          First Name
          <input
            className={styles.input}
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
      </div>
      <div className={styles.inputDivs}>
        <label htmlFor="lastName" className={styles.labels}>
          Last Name
          <input
            className={styles.input}
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
      </div>
      <div className={styles.inputDivs}>
        <label htmlFor="email" className={styles.labels}>
          Email
          <input
            className={styles.input}
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
      </div>
      <div>
        <div className={styles.checkboxDiv}>
          <input
            className={`checkbox ${styles.checkbox}`}
            id="mailingList"
            type="checkbox"
            checked={mailingList}
            onChange={() => setMailingList(!mailingList)}
          />
          <label htmlFor="mailingList" className={styles.labels}>
            <p className={styles.mailingListP}>Mailing List</p>
          </label>
        </div>
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
        <p className={saved ? `${styles.visible}` : `${styles.hidden}`}>
          Updates saved<i className={`${styles.checkMark} fas fa-check`}></i>
        </p>
      </div>
    </form>
  );
};

export default AccountInformation;
