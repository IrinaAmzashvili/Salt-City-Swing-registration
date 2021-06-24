import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTickets, createLike, deleteLike } from "../../store/tickets";
import styles from "./UserPage.module.css";

const UserTickets = ({ userId }) => {
  const dispatch = useDispatch();
  const tickets = useSelector((state) => Object.values(state.tickets));
  console.log(tickets);

  useEffect(() => {
    dispatch(getTickets(+userId));
  }, [dispatch, userId]);

  return (
    <div>
      <h2>Hello from user tickets</h2>
      {tickets.map((like) => (
        <div key={like.id}>
          <p>{like.id}</p>
          <p>{like.userId}</p>
          <p>{like.classId}</p>
          <p>{like.Class?.title}</p>
          <p>{like.price}</p>
          <p>{like.numOfTickets}</p>
        </div>
      ))}
    </div>
  );
};

export default UserTickets;
