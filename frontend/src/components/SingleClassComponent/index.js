import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Lottie from "react-lottie";
import { defaultOptions } from '../../lotties/utils';
import { getClasses, unloadClasses } from "../../store/classes";
import LikeButton from "../LikeButton";
import RegisterModal from "../RegisterModal";
import EditClassModal from "../EditClass";
import DeleteClassModal from "../DeleteClass";
// import { PlaceholderClassImage } from '../../image/image';
import styles from "./Class.module.css";

const SingleClassComponent = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { classId } = useParams();

  const [isLoaded, setIsLoaded] = useState(false);
  const currentClass = useSelector((state) => state.classes[classId]);
  const sessionUser = useSelector((state) => state.session.user);

  const classDate = new Date(currentClass?.startDate);

  useEffect(() => {
    (async () => {
      await dispatch(getClasses());
      setIsLoaded(true);
    })();

    return () => dispatch(unloadClasses());
  }, [dispatch]);

  if (!isLoaded) return <Lottie options={defaultOptions} height={400} width={400} />;

  return (
    <div className={styles.classPageContainer}>
      <div className={styles.classBackgroundImageContainer}>
        <img
          className={styles.classBackgroundImage}
          src={currentClass?.image}
          alt={currentClass?.alt}
        />
      </div>
      <div className={styles.classPageContent}>
        <div className={styles.classImageContainer}>
          <img
            // style={{ backgroundImage: `url(${PlaceholderClassImage()})`}}
            className={styles.classImage}
            src={currentClass?.image}
            // src={PlaceholderClassImage()}
            alt="dancers"
          />
        </div>
        <div className={styles.buttonHeaderDiv}>
          <div className={`${styles.likeButtonDiv} likeButtonDiv`}>
            <LikeButton currentClass={currentClass} />
          </div>
          {sessionUser?.superUser ? (
            <div className={styles.editDeleteButtonsDiv}>
              <div>
                <EditClassModal currentClass={currentClass} />
              </div>
              <div>
                <DeleteClassModal currentClass={currentClass} />
              </div>
            </div>
          ) : null}
          <p className={styles.classCost}>{`$${currentClass?.cost}`}</p>
          <div className={styles.registerButtonDiv}>
            <RegisterModal currentClass={currentClass} />
          </div>
        </div>
        <div className={styles.classContentContainer}>
          <h2 className={styles.classTitle}>{currentClass?.title}</h2>
          <p className={styles.classDates}>{currentClass?.dates}</p>
          <p className={styles.classStartDate}>
            Start date: {classDate.toLocaleDateString()}
          </p>
          <p className={styles.classStartDate}>
            Time:{" "}
            {classDate.toLocaleTimeString("en-US", {
              timeZone: "America/Denver",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <p className={styles.classDescription}>{currentClass?.description}</p>
          <button
            onClick={() => history.goBack()}
            className={`${styles.backButton} link-button`}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleClassComponent;
