import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClasses } from "../../store/classes";

import styles from "./Classes.module.css";

const ClassesComponent = () => {
  const dispatch = useDispatch();
  const classes = useSelector((state) => Object.values(state.classes));

  useEffect(() => {
    dispatch(getClasses());
  }, [dispatch]);

  return (
    <>
      <h2 className={styles.h2Header}>Upcoming Classes</h2>
      <div className={styles.classCardContainer}>
        {classes.map((obj, i) => (
          <div key={i} className={styles.classCard}>
            <a href={`/classes/${obj.id}`}>
              <div className={styles.classCardContent}>
                <div className={styles.cardTop}>
                  <img className={styles.classImage} alt='A couple dancing Lindy Hop' src={obj.image} />
                </div>
                <div className={styles.cardBottom}>
                  <p className={styles.classTitle}>{obj.title}</p>
                  <p className={styles.classDate}>{obj.date}</p>
                </div>
              </div>
              <div className={styles.likeButtonDiv}>
                <button
                    className={styles.likeButton}
                    // onClick={handleLike}
                >
                    <i className={`far fa-heart ${styles.heartIconEmpty}`}></i>
                    {/* <i className={`fas fa-heart ${styles.heartIconFilled}`}></i> */}
                </button>
              </div>
            </a>
          </div>
        ))}
      </div>
    </>
  );
};

export default ClassesComponent;
