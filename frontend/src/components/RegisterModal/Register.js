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
  const [paid, setPaid] = useState(false);

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
    const res = await dispatch(purchaseTicket(newTicket));
    console.log(res);
    if (res.ok) {
      setPaid(true);
    }
  };

  useEffect(() => {
    dispatch(getClasses());
  }, [dispatch]);

  return !paid ? (
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
  ) : (
    <div className={styles.thankYouPageDiv}>
        <h2 className={styles.thankYou}>Thank you for your purchase!</h2>
    </div>
  );
};

export default Register;
