import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoCreateOutline } from "react-icons/io5";
import Lottie from "react-lottie";
import loadingAnimation from "../../lotties/8707-loading.json";
import { getClasses, unloadClasses } from "../../store/classes";
import LikeButton from "../LikeButton";
import styles from "./Classes.module.css";

const ClassesComponent = () => {
  const dispatch = useDispatch();
  const [levelFilter, setLevelFilter] = useState("all");
  const [isLoaded, setIsLoaded] = useState(false);

  const sessionUser = useSelector((state) => state.session.user);

  const classes = useSelector((state) => Object.values(state.classes));
  const level1Classes = classes.filter(
    (classObj) => classObj.Category?.id === 1
  );
  const level2Classes = classes.filter(
    (classObj) => classObj.Category?.id === 2
  );
  const level3Classes = classes.filter(
    (classObj) => classObj.Category?.id === 3
  );

  let displayedClasses;
  switch (levelFilter) {
    case "all":
      displayedClasses = classes;
      break;
    case "1":
      displayedClasses = level1Classes;
      break;
    case "2":
      displayedClasses = level2Classes;
      break;
    case "3":
      displayedClasses = level3Classes;
      break;
    default:
      displayedClasses = classes;
      break;
  }

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    (async () => {
      await dispatch(getClasses());
      setIsLoaded(true);
    })();
    
    return () => dispatch(unloadClasses());
  }, [dispatch]);

  return (
    <div className={styles.classesPageContainer}>
      <h2 className={styles.h2Header}>Upcoming Classes</h2>
      <div className={styles.classesTopDiv}>
        <div className={styles.createClassDiv}>
          {sessionUser?.superUser ? (
            <a
              href="/classes/create"
              className={`link-button ${styles.createClassButton}`}
            >
              <IoCreateOutline />
            </a>
          ) : null}
        </div>
        <div>
          <button
            className={`link-button ${styles.levelFilterButton} ${
              levelFilter === "all" ? styles.active : null
            }`}
            id="all"
            onClick={(e) => setLevelFilter(e.target.id)}
          >
            All
          </button>
          <button
            className={`link-button ${styles.levelFilterButton} ${
              levelFilter === "1" ? styles.active : null
            }`}
            id="1"
            onClick={(e) => setLevelFilter(e.target.id)}
          >
            Level 1
          </button>
          <button
            className={`link-button ${styles.levelFilterButton} ${
              levelFilter === "2" ? styles.active : null
            }`}
            id="2"
            onClick={(e) => setLevelFilter(e.target.id)}
          >
            Level 2
          </button>
          <button
            className={`link-button ${styles.levelFilterButton} ${
              levelFilter === "3" ? styles.active : null
            }`}
            id="3"
            onClick={(e) => setLevelFilter(e.target.id)}
          >
            Level 3
          </button>
        </div>
      </div>

      <div className={styles.classCardContainer}>
        {isLoaded ? (
          displayedClasses.map((classObj, i) => (
            <div key={i} className={styles.classCard}>
              <a href={`/classes/${classObj.id}`}>
                <div className={styles.classCardContent}>
                  <div className={styles.cardTop}>
                    <img
                      className={styles.classImage}
                      alt="dancers"
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
          ))
        ) : (
          <Lottie options={defaultOptions} height={400} width={400} />
        )}
      </div>
    </div>
  );
};

export default ClassesComponent;
