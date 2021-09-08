import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getClasses } from "../../store/classes";
import LikeButton from "../LikeButton";
import RegisterModal from "../RegisterModal";
import EditClassModal from '../EditClass';
import DeleteClassModal from '../DeleteClass';
import styles from "./Class.module.css";

const SingleClassComponent = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { classId } = useParams();
  const currentClass = useSelector((state) => state.classes[classId]);

  const classDate = new Date(currentClass?.startDate)

  useEffect(() => {
    dispatch(getClasses());
  }, [dispatch]);

  return (
    <div className={styles.classPageContainer}>
      <div className={styles.classBackgroundImageContainer}>
        <img
          className={styles.classBackgroundImage}
          src={currentClass?.image}
          alt={currentClass?.alt}
        />
      </div>
      <div className={styles.classPageContent}>
        <div className={styles.classImageContainer}>
          <img
            className={styles.classImage}
            src={currentClass?.image}
            alt='dancers'
          />
        </div>
        <div className={styles.buttonHeaderDiv}>
          <div className={`${styles.likeButtonDiv} likeButtonDiv`}>
            <LikeButton currentClass={currentClass} />
          </div>
          <div>
            <EditClassModal currentClass={currentClass}/>
          </div>
          <div>
            <DeleteClassModal currentClass={currentClass}/>
          </div>
          <p className={styles.classCost}>{`$${currentClass?.cost}`}</p>
          <div className={styles.registerButtonDiv}>
            <RegisterModal currentClass={currentClass}/>
          </div>
        </div>
        <div className={styles.classContentContainer}>
          <h2 className={styles.classTitle}>{currentClass?.title}</h2>
          <p className={styles.classDates}>{currentClass?.dates}</p>
          <p className={styles.classStartDate}>Start date: {classDate.toLocaleDateString()}</p>
          <p className={styles.classStartDate}>Time: {classDate.toLocaleTimeString('en-US', { timeZone: 'America/Denver', hour: '2-digit', minute: '2-digit' })}</p>
          <p className={styles.classDescription}>{currentClass?.description}</p>
          <button onClick={() => history.goBack()} className={`${styles.backButton} link-button`}>Back</button>
        </div>
      </div>
    </div>
  );
};

export default SingleClassComponent;
