import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTickets } from "../../store/tickets";
import styles from "./UserPage.module.css";

const UserTickets = ({ userId }) => {
  const dispatch = useDispatch();
  const tickets = useSelector((state) => Object.values(state.tickets));
  console.log(tickets);
  // if date is equal to 'upcoming',
  // display all tickets where start date is on or before today's date
  // if date is equal to 'past',
  // display all tickets where start date is later than today's date

  useEffect(() => {
    dispatch(getTickets(+userId));
  }, [dispatch, userId]);

  return (
    <div className={styles.userPageContainer}>
      <h2 className={styles.h2}>Upcoming Classes</h2>
      {tickets.map((ticket) => (
        <a href={`/classes/${ticket.Class?.id}`}>
          <div className={styles.classContainer} key={ticket.id}>
            <div className={styles.classInfoContainer}>
              <h3 className={styles.classTitle}>{ticket.Class?.title}</h3>
              <p className={styles.classInfo}>{ticket.Class?.startDate}</p>
              <p className={styles.classInfo}>{ticket.Class?.dates}</p>
              <div className={styles.userTicketInfo}>
                <p>Tickets Purchased: {ticket.numOfTickets}</p>
                <p>Amount Paid: ${ticket.price}</p>
              </div>
            </div>

            <div className={styles.classImageContainer}>
              <img className={styles.classImage} src={ticket.Class?.image} />
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default UserTickets;
