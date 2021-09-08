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
    <div className={styles.deleteModalDiv}>
      <button className={`link-button ${styles.exitButton}`} onClick={() => setShowModal(false)}>
        <i className='far fa-times-circle'></i>
      </button>
      <h1 className={styles.header}>Are you sure?</h1>
      <p className={styles.body}>This action is not reversible</p>
      <div className={styles.deleteModalButtons}>
        <button
          className={`${styles.deleteButton} ctaButton`}
          onClick={handleDelete}
        >
          Delete Class
        </button>
        <button
          className={`${styles.cancelButton} ctaButtonInverse`}
          onClick={() => setShowModal(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteClass;
