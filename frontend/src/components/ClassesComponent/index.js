import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClasses } from "../../store/classes";
import { Route, Switch } from "react-router-dom";
import SingleClassComponent from "../SingleClassComponent";

import styles from "./Classes.module.css";

const ClassesComponent = () => {
  const dispatch = useDispatch();
  const classes = useSelector((state) => Object.values(state.classes));

  useEffect(() => {
    dispatch(getClasses());
  }, [dispatch]);

  return (
    <div className={styles.classCardContainer}>
      <h2>Upcoming Classes</h2>
      {classes.map((obj, i) => (
        <a key={i} href={`/classes/${obj.id}`}>
          <div className={styles.classCard}>
            <div className={styles.cardTop}>
              <p>{obj.image}</p>
            </div>
            <div className={styles.cardBottom}>
              <p>{obj.title}</p>
              <p>{obj.date}</p>
            </div>
            <div className={styles.likeButton}>
              <button>Like</button>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default ClassesComponent;
