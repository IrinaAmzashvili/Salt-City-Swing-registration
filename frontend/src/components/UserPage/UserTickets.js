import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTickets } from "../../store/tickets";
import styles from "./UserPage.module.css";

const UserTickets = ({ userId }) => {
  const dispatch = useDispatch();
  const unorderedTickets = useSelector((state) => Object.values(state.tickets));
  const tickets = unorderedTickets.sort((ticket1, ticket2) => {
    if (ticket1.Class?.startDate > ticket2.Class?.startDate) return 1;
    if (ticket1.Class?.startDate < ticket2.Class?.startDate) return -1;
    if (ticket1.Class?.title > ticket2.Class?.title) return 1;
    if (ticket1.Class?.title < ticket2.Class?.title) return -1;
    return 0;
  });

  useEffect(() => {
    dispatch(getTickets(+userId));
  }, [dispatch, userId]);

  return tickets.length !== 0 ? (
    <div className={styles.userClassesContainer}>
      <h2 className={styles.h2}>Upcoming Classes</h2>
      {tickets.map((ticket) => (
        <a key={ticket.id} href={`/classes/${ticket.Class?.id}`}>
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
              <img
                className={styles.classImage}
                src={ticket.Class?.image}
                alt={ticket.Class?.imageAlt}
              />
            </div>
          </div>
        </a>
      ))}
    </div>
  ) : (
    <div className={styles.userClassesContainer}>
      <h2 className={styles.h2}>Upcoming Classes</h2>
      <p className={styles.noContentP}>{`You have no upcoming classes :(`}</p>
    </div>
  );
};

export default UserTickets;
