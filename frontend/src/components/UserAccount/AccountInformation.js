import { useState } from'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from "../../store/session";
import styles from "./UserAccount.module.css";

const AccountInformation = ({ user }) => {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [email, setEmail] = useState(user?.email);
  const [mailingList, setMailingList] = useState(user?.mailingList);
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedUser = {
      firstName,
      lastName,
      email,
      mailingList,
    };

    return dispatch(sessionActions.updateUser(updatedUser, user?.id)).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) {
            setErrors(data.errors);
        } else {
            setErrors([]);
        }
      }
    );
  };

  return (
    <form className={styles.updateForm} onSubmit={handleSubmit}>
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
        <label htmlFor="firstName" className={styles.inputs}>
          First Name:
        </label>
        <input
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className={styles.inputDivs}>
        <label htmlFor="lastName" className={styles.inputs}>
          Last Name:
        </label>
        <input
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className={styles.inputDivs}>
        <label htmlFor="email" className={styles.inputs}>
          Email:
        </label>
        <input
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <div className={styles.checkboxDiv}>
          <label htmlFor="mailingList" className={styles.inputs}>
            <input
              className={styles.checkbox}
              id="mailingList"
              type="checkbox"
              checked={mailingList}
              onChange={() => setMailingList(!mailingList)}
            />
            Mailing List
          </label>
        </div>
      </div>
      <div>
        <button type="submit">Save</button>
      </div>
    </form>
  );
};

export default AccountInformation;
