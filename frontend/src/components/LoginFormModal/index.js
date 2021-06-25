import { useState } from "react";
import LoginForm from "./LoginForm";
import { Modal } from "../../context/Modal";
import styles from "./LoginForm.module.css";

const LoginFormModal = ({ linkText }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className={styles.loginButton} onClick={() => setShowModal(true)}>
        {linkText}
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
      )}
    </>
  );
};

export default LoginFormModal;
