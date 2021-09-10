import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getClasses, unloadClasses } from "../../store/classes";
import { purchaseTicket, cancelTicket, updateTicket } from "../../store/tickets";
import styles from "./Register.module.css";

const Register = ({ closeModal, currentClass, purchased }) => {
  const history = useHistory();
  const sessionUserId = useSelector((store) => store.session.user.id);
  const dispatch = useDispatch();
  const [price, setPrice] = useState(purchased ? purchased.price : 45);
  const [amount, setAmount] = useState(purchased ? purchased.numOfTickets : 1);
  const [canceled, setCanceled] = useState(false);

  const classDate = new Date(currentClass?.startDate);

  const amountChange = (e) => {
    setPrice(45 * e.target.value);
    setAmount(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTicket = {
      userId: sessionUserId,
      classId: currentClass.id,
      price,
      numOfTickets: +amount,
    };

    let res;
    if (purchased) {
      res = await dispatch(updateTicket(purchased.id, newTicket))
    } else {
      res = await dispatch(purchaseTicket(newTicket));
    }
    if (res.ok) {
      closeModal();
      history.push(`/user/${sessionUserId}`);
    }
  };

  const handleCancel = async (e) => {
    e.preventDefault();

    const res = await dispatch(cancelTicket(purchased.id));
    if (res.ok) {
      setCanceled(true);
      setTimeout(closeModal, 1500);
    }
  };

  useEffect(() => {
    dispatch(getClasses());
    // return () => dispatch(unloadClasses());
  }, [dispatch]);

  return !canceled ? (
    <div className={styles.registerPageDiv}>
      <div className={styles.classInfoDiv}>
        <p className={styles.classTitle}>{currentClass?.title}</p>
        <p className={styles.classStartDate}>Start date: {classDate.toLocaleDateString()}</p>
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
              max="10"
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
            {purchased ? "Update Ticket" : "Purchase"}
          </button>
          {purchased ? (
            <button className={`ctaButtonInverse`} onClick={handleCancel}>
              Cancel Ticket
            </button>
          ) : null}
        </div>
      </form>
    </div>
  ) : (
    <div className={styles.confirmedDiv}>
      <h2 className={styles.confirmed}>Ticket was successfully canceled.</h2>
    </div>
  );
};

export default Register;
