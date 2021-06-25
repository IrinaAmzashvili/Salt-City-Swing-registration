import { useState } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import LoginFormModal from "../LoginFormModal";
import styles from "./SignUpForm.module.css";

const SignUpFormPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [vaxCardImg, setVaxCardImg] = useState("");
  // const [userPhoto, setUserPhoto] = useState("");
  const [mailingList, setMailingList] = useState(false);
  const [userType, setUserType] = useState("user");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      firstName,
      lastName,
      email,
      password,
      // vaxCardImg,
      // userPhoto,
      mailingList,
      userType,
    };

    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signUpUser(newUser)).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
    }
    return setErrors([
      "Confirm Password field must be the same as the Password field",
    ]);
  };

  //   useEffect(() => {
  //     const errors = [];

  //     if (firstName.length < 2) errors.push('First name must be no less than 2 characters long.');
  //     if (firstName.length > 30) errors.push('First name must be no more than 30 characters long.');

  //     if (lastName.length < 2) errors.push('Last name must be no less than 2 characters long.');
  //     if (lastName.length > 30) errors.push('Last name must be no more than 30 characters long.');

  //     if (!email) errors.push('Please provide an email')
  //     if (password !== confirmPassword) errors.push('Passwords must match');

  //   }, [dispatch]);

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        {errors && (
          <div className={styles.errorsDiv}>
            <ul>
              {errors.map((error, i) => (
                <li key={i}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        <div className={styles.nameInputDiv}>
          <div>
            <label>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>
          </div>
        </div>
        <div>
          <label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>
        </div>
        {/* <div>
          <label>
            <input
              type="text"
              placeholder="Upload Vaccination Card"
              value={vaxCardImg}
              onChange={(e) => setVaxCardImg(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            <input
              type="text"
              placeholder="Upload a Profile Photo"
              value={userPhoto}
              onChange={(e) => setUserPhoto(e.target.value)}
            />
          </label>
        </div> */}
        <div className={styles.userTypeRadioDiv}>
          User Type:
          <label className={styles.userTypeLabels} htmlFor="userType-user">
            <input
              type="radio"
              id="userType-user"
              value="user"
              checked={userType === "user"}
              onChange={(e) => setUserType(e.target.value)}
            />
            User
          </label>
          <label className={styles.userTypeLabels} htmlFor="userType-admin">
            <input
              type="radio"
              id="userType-admin"
              value="admin"
              checked={userType === "admin"}
              onChange={(e) => setUserType(e.target.value)}
            />
            Admin
          </label>
          <label className={styles.userTypeLabels} htmlFor="userType-superUser">
            <input
              type="radio"
              id="userType-superUser"
              value="superUser"
              checked={userType === "superUser"}
              onChange={(e) => setUserType(e.target.value)}
            />
            SuperUser
          </label>
        </div>
        <div className={styles.checkboxDiv}>
          <input
            className={styles.checkboxInput}
            id="mailing-list"
            type="checkbox"
            value="mailing-list"
            checked={mailingList}
            onChange={() => setMailingList((prev) => !prev)}
          />
          <label htmlFor="mailing-list">Add me to your mailing list</label>
        </div>
        <button className={styles.submitButton} type="submit">
          Sign Up
        </button>
        <div className={styles.switch}>
          <LoginFormModal linkText={"Already have an account? Log in here!"} />
        </div>
      </form>
    </div>
  );
};

export default SignUpFormPage;
