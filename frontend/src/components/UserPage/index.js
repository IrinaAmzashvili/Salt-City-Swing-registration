import { useState } from "react";
import { useParams } from "react-router-dom";
import UserLikes from "./UserLikes";
import UserTickets from "./UserTickets";
import styles from "./UserPage.module.css";

const UserPage = () => {
  const { userId } = useParams();
  const [view, setView] = useState("upcoming");

  const handleClick = (e) => {
    e.preventDefault();

    setView(e.target.id);
  };

  let displayedList;

  switch (view) {
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
          className={`link-button ${styles.userClassListBtn} ${view === 'upcoming' ? styles.active : null}`}
          id="upcoming"
          onClick={handleClick}
        >
          Upcoming Classes
        </button>
        {/* to implement in the future */}
        {/* <button className={`link-button ${styles.userClassListBtn} ${view === 'past' ? styles.active : null}`} id="past" onClick={handleClick}>
        Past Classes
    </button> */}
        <button
          className={`link-button ${styles.userClassListBtn} ${view === 'likes' ? styles.active : null}`}
          id="likes"
          onClick={handleClick}
        >
          Likes
        </button>
      </div>
      {displayedList}
    </div>
  );
};
export default UserPage;
