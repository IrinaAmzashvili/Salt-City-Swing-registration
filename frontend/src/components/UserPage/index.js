import { useParams } from "react-router-dom";
import UserLikes from "./UserLikes";
import UserTickets from "./UserTickets";
import { useUserViewContext } from '../../context/userView';
import styles from "./UserPage.module.css";

const UserPage = () => {
  const { userView, setUserView } = useUserViewContext();
  const { userId } = useParams();

  let displayedList;
  switch (userView) {
    case "upcoming":
      displayedList = <UserTickets userId={userId} dates={"upcoming"} />;
      break;
    case "past":
      displayedList = <UserTickets userId={userId} dates={"past"} />;
      break;
    case "likes":
      displayedList = <UserLikes userId={userId} />;
      break;
    default:
      displayedList = <UserTickets userId={userId} dates={"upcoming"} />;
      break;
  }

  return (
    <div className={styles.userPageContainer}>
      <div className={styles.userClassesButtonDiv}>
        <button
          className={`link-button ${styles.userClassListBtn} ${userView === 'upcoming' ? styles.active : null}`}
          id="upcoming"
          onClick={(e) => setUserView(e.target.id)}
        >
          Upcoming Classes
        </button>
        {/* to implement in the future */}
        {/* <button className={`link-button ${styles.userClassListBtn} ${userView === 'past' ? styles.active : null}`} id="past" onClick={(e) => setUserView(e.target.id)}>
        Past Classes
    </button> */}
        <button
          className={`link-button ${styles.userClassListBtn} ${userView === 'likes' ? styles.active : null}`}
          id="likes"
          onClick={(e) => setUserView(e.target.id)}
        >
          Likes
        </button>
      </div>
      {displayedList}
    </div>
  );
};
export default UserPage;
