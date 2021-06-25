import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClasses } from "../../store/classes";
import LikeButton from '../LikeButton';
import styles from "./Classes.module.css";

const ClassesComponent = () => {
  const dispatch = useDispatch();
  const classes = useSelector((state) => Object.values(state.classes));

  useEffect(() => {
    dispatch(getClasses());
  }, [dispatch]);

  return (
    <div className={styles.classesPageContainer}>
      <h2 className={styles.h2Header}>Upcoming Classes</h2>
      <div className={styles.classCardContainer}>
        {classes.map((classObj, i) => (
          <div key={i} className={styles.classCard}>
            <a href={`/classes/${classObj.id}`}>
              <div className={styles.classCardContent}>
                <div className={styles.cardTop}>
                  <img
                    className={styles.classImage}
                    alt={classObj.imageAlt}
                    src={classObj.image}
                  />
                </div>
                <div className={styles.cardBottom}>
                  <h3 className={styles.classTitle}>{classObj.title}</h3>
                  <p className={styles.classDate}>{classObj.dates}</p>
                </div>
              </div>
              <div className={`${styles.likeButtonDiv} likeButtonDiv`}>
                <LikeButton currentClass={classObj}/>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassesComponent;
