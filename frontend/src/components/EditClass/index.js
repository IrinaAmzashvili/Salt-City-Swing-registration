import { useState } from 'react';
import EditClass from './EditClass';
import { Modal } from '../../context/Modal';


const EditClassModal = ({ currentClass }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='link-button' onClick={() => setShowModal(true)}>
        <i className="far fa-edit"></i>
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
