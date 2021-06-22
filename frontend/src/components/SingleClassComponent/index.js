import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getClasses } from "../../store/classes";
import styles from "./Class.module.css";

const SingleClassComponent = () => {
  const dispatch = useDispatch();
  const [currentClass, setCurrentClass] = useState({});
  const { classId } = useParams();
  const classes = useSelector((state) => Object.values(state.classes));

  useEffect(() => {
    dispatch(getClasses());
  }, [dispatch]);

  useEffect(() => {
    let classObj = classes.find((obj) => obj.id === +classId);
    setCurrentClass(classObj);
  }, [classes, classId]);

  return (
    <div className={styles.classPageContainer}>
      <div className={styles.classBackgroundImageContainer}>
        <img
          className={styles.classBackgroundImage}
          src={currentClass?.image}
          alt="A couple dancing Lindy Hop"
        />
      </div>
      <div className={styles.classPageContent}>
        <div className={styles.classImageContainer}>
          <img
            className={styles.classImage}
            src={currentClass?.image}
            alt="A couple dancing Lindy Hop"
          />
        </div>
        <div className={styles.classContentContainer}>
          <div className={styles.likeButtonDiv}>
            <button
              className={styles.likeButton}
              // onClick={handleLike}
            >
              <i className={`far fa-heart ${styles.heartIconEmpty}`}></i>
              {/* <i className={`fas fa-heart ${styles.heartIconFilled}`}></i> */}
            </button>
          </div>
          <div>
              <button>Purchase class</button>
          </div>
          <h2>{currentClass?.title}</h2>
          <p>{currentClass?.date}</p>
          <p>Start date: 6/7/21</p>
          <p>{currentClass?.description}</p>
          <p>{`$${currentClass?.cost}`}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleClassComponent;
