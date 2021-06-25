import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLikes, createLike, deleteLike } from "../../store/likes";
import styles from "./UserPage.module.css";

const UserLikes = ({ userId }) => {
  const dispatch = useDispatch();
  const likes = useSelector((state) => Object.values(state.likes));
  console.log(likes);
  // include purchase option

  useEffect(() => {
    dispatch(getLikes(+userId));
  }, [dispatch, userId]);

  return (
    <div>
      <h2>Hello from user likes</h2>
      {likes.map((like) => (
        <div key={like.id}>
          <p>{like.id}</p>
          <p>{like.userId}</p>
          <p>{like.classId}</p>
          <p>{like.Class.title}</p>
        </div>
      ))}
    </div>
  );
};

export default UserLikes;
