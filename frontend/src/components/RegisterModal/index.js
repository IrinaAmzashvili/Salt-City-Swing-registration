import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Register from "./Register";
import LoginForm from '../LoginFormModal/LoginForm';
import { Modal } from "../../context/Modal";
import { getTickets } from '../../store/tickets';

const RegisterModal = ({ currentClass }) => {
  // need isLoaded?
  const dispatch = useDispatch();
  const sessionUser = useSelector((store) => store.session.user);
  const tickets = useSelector((store) => Object.values(store.tickets));
  const [showModal, setShowModal] = useState(false);

  const purchased = tickets.find(tic => (tic.classId === currentClass?.id))

  const closeModal = () => {
    setShowModal(false);
  }

  useEffect(() => {
    dispatch(getTickets(sessionUser?.id));
  }, [dispatch, sessionUser?.id])

  let sessionLinks;
  if (sessionUser) {
      sessionLinks = <Register closeModal={closeModal} currentClass={currentClass} purchased={purchased} />
  } else {
      sessionLinks = <LoginForm />
  }

  return (
    <>
      <button
        className='ctaButton'
        onClick={() => setShowModal(true)}
      >
        {purchased ? 'Update Ticket' : 'Register'}
      </button>
      {showModal && (
        <Modal onClose={closeModal}>
          {sessionLinks}
        </Modal>
      )}
    </>
  );
};

export default RegisterModal;
