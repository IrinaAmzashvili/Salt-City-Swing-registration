import { useEffect, useState } from "react";
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
  console.log(view, displayedList);

  return (
    <div className="classes list">
      <button id="upcoming" onClick={handleClick}>
        Upcoming Classes
      </button>
      {/* to implement in the future */}
      {/* <button id="past" onClick={handleClick}>
        Past Classes
      </button> */}
      <button id="likes" onClick={handleClick}>
        Likes
      </button>
      {displayedList}
    </div>
  );
};
export default UserPage;
