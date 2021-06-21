import { useState } from 'react';
import LoginForm from './LoginForm';
import { Modal } from '../../context/Modal';
import styles from './LoginForm.module.css';

const LoginFormModal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className={styles.loginButton} onClick={() => setShowModal(true)}>Log In</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
      )}
    </>
  )
}

export default LoginFormModal;
