import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import { getLevels, unloadLevels } from "../../store/levels";
import { createClass } from "../../store/classes";
import styles from "./CreateClass.module.css";
import "react-datepicker/dist/react-datepicker.css";

const CreateClass = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const levels = useSelector((state) => Object.values(state.levels));
  const sessionUser = useSelector((state) => state.session.user);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [cost, setCost] = useState("");
  const [levelId, setLevelId] = useState("");
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    dispatch(getLevels());
    return () => dispatch(unloadLevels());
  }, [dispatch]);

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  }

  const disablePastTimes = (time) => {
    const today = new Date();
    const selected = new Date(time);
    return today.getTime() < selected.getTime();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const formData = new FormData();
    const newClass = {
      title,
      description,
      startDate,
      cost: +cost,
      categoryId: +levelId,
      image,
    };
    for (let key in newClass) {
      formData.append(key, newClass[key]);
    }

    return dispatch(createClass(formData))
      .then((res) => history.push(`/classes/${res.id}`))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
          window.scroll(0, 0);
        }
      });
  };

  // if user not superuser, display 404 page
  if (!sessionUser?.superUser) {
    return (
      <h1>404 Page Not Found</h1>
    )
  }

  return (
    <div className={styles.createClassContainer}>
      <h1 className={styles.header}>Create a new class</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        {errors && errors.map((error, idx) => <li key={idx}>{error}</li>)}
        <div>
          <label className={styles.labels} htmlFor="class-title">
            Title:
          </label>
          <input
            id="class-title"
            className={styles.input}
            type="text"
            placeholder="Class Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label className={styles.labels} htmlFor="class-description">
            Description:
          </label>
          <textarea
            id="class-description"
            className={styles.input}
            type="text"
            placeholder="Class description...."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label className={styles.labels} htmlFor="class-start-date">
            Start Date:
          </label>
          <DatePicker
            id="class-start-date"
            className={styles.input}
            showTimeSelect
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="MMM d, yyyy h:mm aa"
            filterTime={disablePastTimes}
            minDate={new Date()}
          />
        </div>
        <div>
          <label className={styles.labels} htmlFor="class-cost">
            Cost:
          </label>
          <input
            id="class-cost"
            className={styles.input}
            type="number"
            min="0"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
          />
        </div>
        <div>
          <label className={styles.labels} htmlFor="class-level">
            Level:
          </label>
          <select
            id="class-level"
            className={styles.input}
            value={levelId}
            name="class-level"
            onChange={(e) => setLevelId(e.target.value)}
          >
            <option value="" disabled>
              Select a level
            </option>
            {levels &&
              levels.map((level) => (
                <option key={level.id} value={level.id}>
                  {level.type}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label className={styles.labels} htmlFor="class-image">
            Image:
          </label>
          <input
            id="class-image"
            className={styles.input}
            type="file"
            onChange={updateFile}
          />
        </div>
        <div>
          <button type="submit" className="ctaButton">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateClass;
