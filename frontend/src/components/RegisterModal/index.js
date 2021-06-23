import { useState } from "react";
import { useSelector } from 'react-redux';
import Register from "./Register";
import LoginForm from '../LoginFormModal/LoginForm';
import { Modal } from "../../context/Modal";
import styles from "./Register.module.css";

const RegisterModal = () => {
  // need isLoaded?
  const sessionUser = useSelector((store) => store.session.user);
  const [showModal, setShowModal] = useState(false);

  let sessionLinks;
  if (sessionUser) {
      sessionLinks = <Register />
  } else {
      sessionLinks = <LoginForm />
  }

  return (
    <>
      <button
        className={styles.registerButton}
        onClick={() => setShowModal(true)}
      >
        Register
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {sessionLinks}
        </Modal>
      )}
    </>
  );
};

export default RegisterModal;
