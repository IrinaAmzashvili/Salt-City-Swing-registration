import { useState } from 'react';
import DeleteClass from './DeleteClass';
import { Modal } from '../../context/Modal';


const DeleteClassModal = ({ currentClass }) => {
  const [showModal, setShowModal] = useState();

  return (
    <>
      <button onClick={() => setShowModal(true)}>
        Delete
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteClass setShowModal={setShowModal} currentClass={currentClass}/>
        </Modal>
      )}
    </>
  )
}

export default DeleteClassModal;
