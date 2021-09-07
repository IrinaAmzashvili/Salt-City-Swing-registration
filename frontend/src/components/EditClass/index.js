import { useState } from 'react';
import EditClass from './EditClass';
import { Modal } from '../../context/Modal';
import styles from './EditClass.module.css';


const EditClassModal = ({ currentClass }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>
        Edit
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditClass setShowModal={setShowModal} currentClass={currentClass} />
        </Modal>
      )}
    </>
  )
}

export default EditClassModal;
