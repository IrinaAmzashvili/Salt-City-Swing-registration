import { useState } from "react";
import { useDispatch } from "react-redux";
import { postImage, deleteImage } from "../../store/images";
import { editClass } from "../../store/classes";
import styles from "./EditClassImage.module.css";

const EditClassImage = ({ currentClass, setShowModal }) => {
  const dispatch = useDispatch();
  const [imageFile, setImageFile] = useState(currentClass.image);
  const [errors, setErrors] = useState([]);

  const updateImage = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = await dispatch(postImage(file));
      if (imageFile) await dispatch(deleteImage(imageFile));
      setImageFile(url);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const editedClass = {
      title: currentClass.title,
      description: currentClass.description,
      startDate: currentClass.startDate,
      cost: currentClass.cost,
      categoryId: currentClass.categoryId,
      image: imageFile,
    };

    return dispatch(editClass(currentClass.id, editedClass))
      .then(() => setShowModal(false))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  return (
    <div className={styles.editImageModalContainer}>
      <button
        className={`link-button ${styles.exitButton}`}
        onClick={() => setShowModal(false)}
      >
        <i className="far fa-times-circle"></i>
      </button>
      <div className={styles.imagePreviewDiv}>
        <img src={imageFile} alt="preview" className={styles.imagePreview} />
      </div>
      <form onSubmit={handleSubmit}>
        {errors && (
          <div className="errorsDiv">
            <ul>
              {errors.map((error, i) => (
                <li key={i}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        <div className={styles.labelInputDiv}>
          <label className={styles.label} htmlFor="class-image">
            Upload new image:
          </label>
          <input
            id="class-image"
            className={styles.input}
            type="file"
            onChange={updateImage}
          />
        </div>
        <div className={styles.buttonsDiv}>
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

export default EditClassImage;
