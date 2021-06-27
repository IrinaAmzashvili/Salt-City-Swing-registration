import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClasses } from "../../store/classes";
import LikeButton from "../LikeButton";
import styles from "./Classes.module.css";

const ClassesComponent = () => {
  const dispatch = useDispatch();
  const [levelFilter, setLevelFilter]= useState('all');

  const classes = useSelector((state) => Object.values(state.classes));
  const level1Classes = classes.filter((classObj) => classObj.Category?.id === 1);
  const level2Classes = classes.filter((classObj) => classObj.Category?.id === 2);
  const level3Classes = classes.filter((classObj) => classObj.Category?.id === 3);

  let displayedClasses;
  switch (levelFilter) {
    case 'all':
      displayedClasses = classes;
      break;
    case '1':
      displayedClasses = level1Classes;
      break;
    case '2':
      displayedClasses = level2Classes;
      break;
    case '3':
      displayedClasses = level3Classes;
      break;
    default:
      displayedClasses = classes;
      break;
  }

  useEffect(() => {
    dispatch(getClasses());
  }, [dispatch]);

  return (
    <div className={styles.classesPageContainer}>
      <h2 className={styles.h2Header}>Upcoming Classes</h2>
      <div className={styles.levelFilterDiv}>
        <button
          className={`link-button ${styles.levelFilterButton} ${levelFilter === 'all' ? styles.active : null}`}
          id="all"
          onClick={(e) => setLevelFilter(e.target.id)}
        >
          All
        </button>
        <button
          className={`link-button ${styles.levelFilterButton} ${levelFilter === '1' ? styles.active : null}`}
          id="1"
          onClick={(e) => setLevelFilter(e.target.id)}
        >
          Level 1
        </button>
        <button
          className={`link-button ${styles.levelFilterButton} ${levelFilter === '2' ? styles.active : null}`}
          id="2"
          onClick={(e) => setLevelFilter(e.target.id)}
        >
          Level 2
        </button>
        <button
          className={`link-button ${styles.levelFilterButton} ${levelFilter === '3' ? styles.active : null}`}
          id="3"
          onClick={(e) => setLevelFilter(e.target.id)}
        >
          Level 3
        </button>
      </div>
      <div className={styles.classCardContainer}>
        {displayedClasses.map((classObj, i) => (
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
                <LikeButton currentClass={classObj} />
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassesComponent;
