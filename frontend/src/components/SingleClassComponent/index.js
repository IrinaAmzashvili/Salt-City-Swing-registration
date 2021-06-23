import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getClasses } from "../../store/classes";
import styles from "./Class.module.css";

const SingleClassComponent = () => {
  const dispatch = useDispatch();
  const { classId } = useParams();
  const currentClass = useSelector((state) => state.classes[classId]);

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
          <p className={styles.classDates}>{currentClass?.dates}</p>
          <p className={styles.classStartDate}>Start date: 6/7/21</p>
          <p className={styles.classDescription}>{currentClass?.description}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleClassComponent;
