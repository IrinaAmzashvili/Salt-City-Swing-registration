import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLikes, createLike, deleteLike } from "../../store/likes";
import styles from "./LikeButton.module.css";

const LikeButton = ({ currentClass }) => {
  const dispatch = useDispatch();
  const likes = useSelector((state) => Object.values(state.likes));
  const userId = useSelector((store) => store.session.user?.id);

  const currLike = likes.find(like => (
      like.classId === currentClass?.id
  ))

  const handleLike = (e) => {
      e.preventDefault();

      const likeInfo = {
          userId,
          classId: currentClass.id,
    };
    if (currLike) {
        dispatch(deleteLike(currLike.id));
    } else {
        dispatch(createLike(likeInfo));
    }
  };

  useEffect(() => {
    if (userId) dispatch(getLikes(userId));
  }, [dispatch, userId]);

  return (
    userId ? <button className={styles.likeButton} onClick={handleLike}>
      <i
        className={
          currLike
            ? `fas fa-heart ${styles.heartIconFilled}`
            : `far fa-heart ${styles.heartIconEmpty}`
        }
      ></i>
    </button>
    : null
  );
};

export default LikeButton;
