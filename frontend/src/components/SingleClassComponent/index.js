import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getClasses } from "../../store/classes";
import styles from "./Class.module.css";
import { ClassImage } from '../../image/image';

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
        //   src={currentClass?.image}
        //   src={`${classImages}/${currentClass?.image}`}
          src={ClassImage()}
          alt={currentClass?.alt}
        />
      </div>
      <div className={styles.classPageContent}>
        <div className={styles.classImageContainer}>
          <img
            className={styles.classImage}
            // src={currentClass?.image}
            src={ClassImage()}
            alt={currentClass?.alt}
          />
        </div>
        <div className={styles.buttonHeaderDiv}>
          <div className={`${styles.likeButtonDiv} likeButtonDiv`}>
            <button
              className="likeButton"
              // onClick={handleLike}
            >
              <i className="far fa-heart heartIconEmpty"></i>
              {/* <i className='fas fa-heart heartIconFilled'></i> */}
            </button>
          </div>
          <p className={styles.classCost}>{`$${currentClass?.cost}`}</p>
          <div className={styles.registerButtonDiv}>
            <button className={styles.registerButton}>Register</button>
          </div>
        </div>
        <div className={styles.classContentContainer}>
          <h2 className={styles.classTitle}>{currentClass?.title}</h2>
          <p className={styles.classDates}>{currentClass?.date}</p>
          <p className={styles.classStartDate}>Start date: 6/7/21</p>
          <p className={styles.classDescription}>{currentClass?.description}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleClassComponent;
