import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getClasses } from "../../store/classes";
import { purchaseTicket } from '../../store/tickets';
import styles from "./Register.module.css";

const Register = () => {
  const sessionUserId = useSelector((store) => store.session.user.id);
  const dispatch = useDispatch();
  const { classId } = useParams();
  const currentClass = useSelector((state) => state.classes[classId]);
  const [price, setPrice] = useState(45);
  const [amount, setAmount] = useState(1);

  const amountChange = (e) => {
    setPrice(45 * e.target.value);
    setAmount(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTicket = {
        userId: sessionUserId,
        classId: +classId,
        price,
        numOfTickets: +amount,
    }

    dispatch(purchaseTicket(newTicket));
  };

  useEffect(() => {
    dispatch(getClasses());
  }, [dispatch]);

  return (
    <div>
      <div>
        <p>{currentClass?.title}</p>
        <p>{currentClass?.dates}</p>
        <p>{currentClass?.startDate}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <p>${price}</p>
        <label>
          <input
            type="number"
            value={amount}
            min='1'
            onChange={amountChange}
          />
        </label>
        <button type="submit">Purchase</button>
      </form>
    </div>
  );
};

export default Register;
