import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClasses } from "../../store/classes";
// import { allImages } from '../../image/image';

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
        {classes.map((obj, i) => (
          <div key={i} className={styles.classCard}>
            <a href={`/classes/${obj.id}`}>
              <div className={styles.classCardContent}>
                <div className={styles.cardTop}>
                  <img
                    className={styles.classImage}
                    alt={obj.imageAlt}
                    // src={allImages['dance-image-1.jpg']}
                    src={obj.image}
                  />
                </div>
                <div className={styles.cardBottom}>
                  <p className={styles.classTitle}>{obj.title}</p>
                  <p className={styles.classDate}>{obj.dates}</p>
                </div>
              </div>
              <div className={`${styles.likeButtonDiv} likeButtonDiv`}>
                <button
                  className="likeButton"
                  // onClick={handleLike}
                >
                  <i className="far fa-heart heartIconEmpty"></i>
                  {/* <i className='fas fa-heart heartIconFilled'></i> */}
                </button>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassesComponent;
