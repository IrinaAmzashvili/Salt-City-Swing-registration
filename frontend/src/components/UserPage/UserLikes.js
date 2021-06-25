import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLikes } from "../../store/likes";
import RegisterModal from "../RegisterModal";
import LikeButton from "../LikeButton";
import styles from "./UserPage.module.css";

const UserLikes = ({ userId }) => {
  const dispatch = useDispatch();
  const likes = useSelector((state) => Object.values(state.likes));
  console.log(likes);

  const handleClick =(e) => {
      e.stopPropagation();
      e.preventDefault();
  }

  useEffect(() => {
    dispatch(getLikes(+userId));
  }, [dispatch, userId]);

  return (
    <div className={styles.userPageContainer}>
      <h2 className={styles.h2}>Likes</h2>
      {likes.map((like) => (
        <a href={`/classes/${like.Class?.id}`}>
          <div className={styles.classContainer} key={like.id}>
            <div className={styles.classInfoContainer}>
              <h3 className={styles.classTitle}>{like.Class?.title}</h3>
              <p>{like.Class?.startDate}</p>
              <p>{like.Class?.dates}</p>
            </div>

            <div className={styles.classImageContainer}>
              <img className={styles.classImage} src={like.Class?.image} />
              <div className={styles.buttonsDiv}>
                <div className={styles.likeButtonDiv}>
                  <LikeButton currentClass={like.Class} />
                </div>
                <div
                  onClick={handleClick}
                  className={styles.registerButtonDiv}>
                  <RegisterModal />
                </div>
              </div>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default UserLikes;
