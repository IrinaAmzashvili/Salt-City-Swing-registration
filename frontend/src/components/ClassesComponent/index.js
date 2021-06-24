import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClasses } from "../../store/classes";
import { getLikes, createLike } from "../../store/likes";
import styles from "./Classes.module.css";

const ClassesComponent = () => {
  const dispatch = useDispatch();
  const classes = useSelector((state) => Object.values(state.classes));
  const likes = useSelector((state) => state.likes);
  const userId = useSelector((store) => store.session.user?.id);
  console.log(likes)
  // likes are coming in as an array instead of an object
  // implement delete like function and switch image
  // post like not working for some reason

  const handleLike = (e) => {
    //switch image
    e.preventDefault();

    const likeInfo = {
      userId,
      classId: e.target.id,
    };
    dispatch(createLike(likeInfo));
  };

  useEffect(() => {
    dispatch(getClasses());
    dispatch(getLikes(userId));
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
                  <p className={styles.classTitle}>{classObj.title}</p>
                  <p className={styles.classDate}>{classObj.dates}</p>
                </div>
              </div>
              <div className={`${styles.likeButtonDiv} likeButtonDiv`}>
                <button className="likeButton" onClick={handleLike}>
                  <i
                    id={classObj.id}
                    className={
                      likes[classObj?.id]
                        ? "fas fa-heart heartIconFilled"
                        : "far fa-heart heartIconEmpty"
                    }
                  ></i>
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
