import { useState } from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import { Modal } from "../../context/Modal";
import styles from "./UserAccount.module.css";

const CloseAccount = ({ user }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("1st-->", showModal);

    if (password === confirmPassword) {
      setErrors([]);

      await dispatch(sessionActions.validatePassword(password, user?.id)).catch(
        async (res) => {
          console.log("-----> inside handler 1");
          const data = await res.json();
          if (data && data.errors) {
            console.log("-----> inside handler 2");

            return setErrors(data.errors);
          }
        }
      );
      openModal();
    } else {
      return setErrors(["Passwords don't match."]);
    }
  };

  const deleteAccount = async (e) => {
    e.preventDefault();

    await dispatch(sessionActions.deleteUser(password, user?.id)).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      }
    );
    history.push('/');
  };

  const openModal = () => {
    if (!errors.length) {
      console.log("-----> inside handler 3", errors);
      setShowModal(true);
      console.log(showModal);
    }
  };

  const closeModal = () => {
    setShowModal(false);
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
        <label>
          Enter Password
          <input
            className={styles.input}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </div>
      <div className={styles.inputDivs}>
        <label>
          Confirm Password
          <input
            className={styles.input}
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
      </div>
      <button type="submit" className={`${styles.accountDeleteBtn} ctaButton`}>
        Delete Account
      </button>
      {showModal && (
        <Modal onClose={closeModal}>
          <div className={styles.deleteModal}>
            {errors && (
              <div className={`${styles.accountErrors} errorsDiv`}>
                <ul className={styles.errorsUl}>
                  {errors.map((error, i) => (
                    <li key={i}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
            <h2>Are you sure?</h2>
            <p>Are you sure you would like to delete your account?</p>
            <div className={styles.deleteModalButtons}>
              <button
                className={`${styles.accountDeleteBtn} ctaButton`}
                onClick={deleteAccount}
              >
                Delete Account
              </button>
              <button
                className={`${styles.accountSaveBtn} ctaButton`}
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}
    </form>
  );
};

export default CloseAccount;
