import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import { getLevels } from "../../store/levels";
import { editClass } from "../../store/classes";
import styles from "./EditClass.module.css";
import "react-datepicker/dist/react-datepicker.css";

const EditClass = ({ currentClass, setShowModal }) => {
  const dispatch = useDispatch();
  const levels = useSelector((state) => Object.values(state.levels));

  const [title, setTitle] = useState(currentClass.title);
  const [description, setDescription] = useState(currentClass.description);
  const [startDate, setStartDate] = useState(new Date(currentClass.startDate));
  const [cost, setCost] = useState(currentClass.cost);
  const [levelId, setLevelId] = useState(currentClass.categoryId);
  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    dispatch(getLevels());
  }, [dispatch]);

  const updateImage = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const disablePastTimes = (time) => {
    const today = new Date();
    const selected = new Date(time);
    return today.getTime() < selected.getTime();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    let image;
    if (!imageFile) {
      image = currentClass.image;
    } else {
      image = imageFile;
    }

    const formData = new FormData();
    const editedClass = {
      title,
      description,
      startDate,
      cost: +cost,
      categoryId: +levelId,
      image,
    };
    console.log(editedClass)
    for (const key in editedClass) {
      formData.append(key, editedClass[key]);
    }

    return dispatch(editClass(currentClass.id, formData))
      .then(() => setShowModal(false))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  return (
    <div className={styles.createClassContainer}>
      <button
        className={`link-button ${styles.exitButton}`}
        onClick={() => setShowModal(false)}
      >
        <i className="far fa-times-circle"></i>
      </button>
      <h1 className={styles.header}>Edit this class</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        {errors && errors.map((error, idx) => <li key={idx}>{error}</li>)}
        <div className={styles.inputFieldDivSections}>
          <div>
            <div className={styles.labelAndInputDiv}>
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
            <div className={styles.labelAndInputDiv}>
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
          </div>

          <div>
            <div className={styles.labelAndInputDiv}>
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
            <div className={styles.labelAndInputDiv}>
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
            <div className={styles.labelAndInputDiv}>
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
            <div className={styles.labelAndInputDiv}>
              <label className={styles.labels} htmlFor="class-image">
                Image:
              </label>
              <input
                id="class-image"
                className={styles.input}
                type="file"
                // value={image}
                onChange={updateImage}
              />
            </div>
          </div>
        </div>

        <div className={styles.editModalButtons}>
          <button type="submit" className="ctaButton">
            Save
          </button>
          <button
            className={`${styles.cancelButton} ctaButtonInverse`}
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditClass;
