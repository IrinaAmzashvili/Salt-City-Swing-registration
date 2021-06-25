import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClasses } from "../../store/classes";
import { purchaseTicket } from "../../store/tickets";
import styles from "./Register.module.css";

const Register = ({ closeModal, currentClass }) => {
  const sessionUserId = useSelector((store) => store.session.user.id);
  const dispatch = useDispatch();
  const [price, setPrice] = useState(45);
  const [amount, setAmount] = useState(1);

  const amountChange = (e) => {
    setPrice(45 * e.target.value);
    setAmount(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTicket = {
      userId: sessionUserId,
      classId: currentClass.id,
      price,
      numOfTickets: +amount,
    };
    dispatch(purchaseTicket(newTicket));
    closeModal();
  };

  useEffect(() => {
    dispatch(getClasses());
  }, [dispatch]);

  return (
    <div className={styles.registerPageDiv}>
      <div className={styles.classInfoDiv}>
        <p className={styles.classTitle}>{currentClass?.title}</p>
        <p className={styles.classStartDate}>{currentClass?.startDate}</p>
        <p className={styles.classDates}>{currentClass?.dates}</p>
      </div>
      <form className={styles.form}>
        <div className={styles.inputDiv}>
          <p>${price}.00</p>
          <label>
            <input
              className={styles.amountInput}
              type="number"
              value={amount}
              min="1"
              onChange={amountChange}
            />
          </label>
        </div>
        <div className={styles.purchaseButtonDiv}>
          <button
            className={`ctaButton ${styles.purchaseButton}`}
            type="submit"
            onClick={handleSubmit}
          >
            Purchase
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
