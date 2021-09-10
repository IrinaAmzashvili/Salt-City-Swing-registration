import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import AccountInformation from './AccountInformation';
import UpdatePassword from './UpdatePassword';
import CloseAccount from './CloseAccount';
import styles from "./UserAccount.module.css";

const UserAccount = () => {
  const { userId } = useParams();
  const user = useSelector((state) => state.session.user);
  const [view, setView] = useState("Account Information");

  let displayedForm;
  switch (view) {
    case 'Account Information':
      displayedForm = <AccountInformation user={user} />;
      break;
    case 'Update Password':
      displayedForm = <UpdatePassword user={user} />;
      break;
    case 'Close Account':
      displayedForm = <CloseAccount user={user} />;
      break;
    default:
      displayedForm = <AccountInformation user={user} />;
      break;
  }

  if (user?.id !== +userId) return <h1>404 Page Not Found</h1>

  return (
    <div className={styles.accountPageDiv}>
      <div className={styles.buttonDiv}>
        <button
          id='Account Information'
          onClick={(e) => setView(e.target.id)}
          className={`link-button ${styles.accountButton} ${
            view === "Account Information" ? styles.active : null
          }`}
        >
          Account Information
        </button>
        <button
          id='Update Password'
          onClick={(e) => setView(e.target.id)}
          className={`link-button ${styles.accountButton} ${
            view === "Update Password" ? styles.active : null
          }`}
        >
          Password
        </button>
        <button
          id='Close Account'
          onClick={(e) => setView(e.target.id)}
          className={`link-button ${styles.accountButton} ${
            view === "Close Account" ? styles.active : null
          }`}
        >
          Close Account
        </button>
      </div>
      <div className={styles.formDiv}>
        <h2>{view}</h2>
        {displayedForm}
      </div>
    </div>
  );
};

export default UserAccount;
