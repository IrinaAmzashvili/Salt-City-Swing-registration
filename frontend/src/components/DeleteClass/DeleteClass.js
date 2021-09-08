import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteClass } from '../../store/classes';
import styles from "./DeleteClass.module.css";

const DeleteClass = ({ currentClass, setShowModal }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleDelete = (e) => {
    e.preventDefault();

    return dispatch(deleteClass(currentClass?.id)).then(() => history.push('/')).catch()
  }

  return (
    <div>
      <button onClick={() => setShowModal(false)}>x</button>
      <h1>Are you sure?</h1>
      <p>This action is not reversible</p>
      <div className={styles.deleteModalButtons}>
        <button
          className={`${styles.accountDeleteBtn} ctaButton`}
          onClick={handleDelete}
        >
          Delete
        </button>
        <button
          className={`${styles.accountSaveBtn} ctaButton`}
          onClick={() => setShowModal(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteClass;
