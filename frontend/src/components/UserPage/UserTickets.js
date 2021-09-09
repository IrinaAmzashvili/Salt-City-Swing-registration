import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Lottie from "react-lottie";
import { defaultOptions } from '../../lotties/utils';
import { getTickets, unloadTickets } from "../../store/tickets";
// import RegisterModal from "../RegisterModal";
import styles from "./UserPage.module.css";

const UserTickets = ({ userId }) => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const unorderedTickets = useSelector((state) => Object.values(state.tickets));
  const tickets = unorderedTickets.sort((ticket1, ticket2) => {
    if (ticket1.Class?.startDate > ticket2.Class?.startDate) return 1;
    if (ticket1.Class?.startDate < ticket2.Class?.startDate) return -1;
    if (ticket1.Class?.title > ticket2.Class?.title) return 1;
    if (ticket1.Class?.title < ticket2.Class?.title) return -1;
    return 0;
  });

  const classDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  const classTime = (date) => {
    return new Date(date).toLocaleTimeString("en-US", {
      timeZone: "America/Denver",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // const handleClick = (e) => {
  //   e.stopPropagation();
  //   e.preventDefault();
  // };

  useEffect(() => {
    (async () => {
      await dispatch(getTickets(+userId));
      setIsLoaded(true);
    })();
    return () => dispatch(unloadTickets());
  }, [dispatch, userId]);

  if (!isLoaded) return <Lottie options={defaultOptions} height={400} width={400} />;

  return tickets.length !== 0 ? (
    <div className={styles.userClassesContainer}>
      <h2 className={styles.h2}>Upcoming Classes</h2>
      {tickets.map((ticket) => (
        <a key={ticket.id} href={`/classes/${ticket.Class?.id}`}>
          <div className={styles.classContainer} key={ticket.id}>
            <div className={styles.classInfoContainer}>
              <h3 className={styles.classTitle}>{ticket.Class?.title}</h3>
              <p className={styles.classInfo}>
                Start Date: {classDate(ticket.Class?.startDate)}
              </p>
              <p className={styles.classInfo}>
                Time: {classTime(ticket.Class?.startDate)}
              </p>
              <div className={styles.userTicketInfo}>
                <p>Tickets Purchased: {ticket.numOfTickets}</p>
                <p>Amount Paid: ${ticket.price}</p>
              </div>
            </div>

            <div>
              <div className={styles.classImageContainer}>
                <img
                  className={styles.classImage}
                  src={ticket.Class?.image}
                  alt="dancers"
                />
              </div>
              {/* <div onClick={handleClick}>
                <RegisterModal currentClass={ticket.Class} />
              </div> */}
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
