import { useState } from "react";
import { useHistory } from "react-router-dom";
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

    if (password && password === confirmPassword) {
      await setErrors([]);

      await dispatch(sessionActions.validatePassword(password, user?.id))
        .then(() => {
          setShowModal(true);
        })
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors);
            window.scroll(0, 200);
            return;
          }
        });
    } else {
      setErrors(["Passwords must match."]);
      window.scroll(0, 200);
      return;
    }
  };

  const deleteAccount = async (e) => {
    e.preventDefault();

    await dispatch(sessionActions.deleteUser(password, user?.id))
      .then(() => {
        history.push("/");
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
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
      <button
        type="submit"
        className={`${styles.accountDeleteBtn} ctaButton`}
        disabled={user?.id === 1 ? true : false}
        title={user?.id === 1 ? 'Demo account information cannot be updated' : null}
      >
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
            <p>This action is not reversible</p>
            <div className={styles.deleteModalButtons}>
              <button
                className={`${styles.accountDeleteBtn} ctaButton`}
                onClick={deleteAccount}
                disabled={user?.id === 1 ? true : false}
                title={user?.id === 1 ? 'Demo account information cannot be updated' : null}
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
