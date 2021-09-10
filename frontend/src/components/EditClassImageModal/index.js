import { useState } from "react";
import EditClassImage from "./EditClassImage";
import { Modal } from "../../context/Modal";
import styles from "./EditClassImage.module.css";

const EditClassImageModal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className={styles.editImageButton} onClick={() => setShowModal(true)}>
        Edit Image
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditClassImage />
        </Modal>
      )}
    </>
  );
};

export default EditClassImageModal;
