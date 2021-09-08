import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLikes } from "../../store/likes";
import RegisterModal from "../RegisterModal";
import LikeButton from "../LikeButton";
import styles from "./UserPage.module.css";

const UserLikes = ({ userId }) => {
  const dispatch = useDispatch();
  const unorderedLikes = useSelector((state) => Object.values(state.likes));
  const likes = unorderedLikes.sort((like1, like2) => {
    if (like1.Class?.startDate > like2.Class?.startDate) return 1;
    if (like1.Class?.startDate < like2.Class?.startDate) return -1;
    if (like1.Class?.title > like2.Class?.title) return 1;
    if (like1.Class?.title < like2.Class?.title) return -1;
    return 0;
  });

  const handleClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  useEffect(() => {
    dispatch(getLikes(+userId));
  }, [dispatch, userId]);

  return likes.length !== 0 ? (
    <div className={styles.userClassesContainer}>
      <h2 className={styles.h2}>Likes</h2>
      {likes.map((like) => (
        <a key={like.id} href={`/classes/${like.Class?.id}`}>
          <div className={styles.classContainer} key={like.id}>
            <div className={styles.classInfoContainer}>
              <h3 className={styles.classTitle}>{like.Class?.title}</h3>
              <p>{like.Class?.startDate}</p>
              <p>{like.Class?.dates}</p>
            </div>

            <div className={styles.classImageContainer}>
              <img
                className={styles.classImage}
                src={like.Class?.image}
                alt='dancers'
              />
              <div className={styles.buttonsDiv}>
                <div className={styles.likeButtonOuterDiv}>
                  <div className={`${styles.likeButtonDiv} likeButtonDiv`}>
                    <LikeButton currentClass={like.Class} />
                  </div>
                </div>
                <div onClick={handleClick} className={styles.registerButtonDiv}>
                  <RegisterModal currentClass={like.Class} />
                </div>
              </div>
            </div>
          </div>
        </a>
      ))}
    </div>
  ) : (
    <div className={styles.userClassesContainer}>
      <h2 className={styles.h2}>Likes</h2>
      <p className={styles.noContentP}>{`You have no likes :(`}</p>
    </div>
  );
};

export default UserLikes;
