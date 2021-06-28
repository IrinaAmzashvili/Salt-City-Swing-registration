import { useState } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import loginStyles from "./LoginForm.module.css";
import styles from "../SignUpFormPage/SignUpForm.module.css";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    return dispatch(
      sessionActions.login({ credential: email, password })
    ).catch(async (res) => {
      const data = await res.json();

      if (data && data.errors) setErrors(data.errors);
    });
  };

  return (
    <div className={loginStyles.mainLoginContainer}>
      <div
        className={`${styles.formContainer} ${loginStyles.loginFormContainer}`}
      >
        <form
          className={`${styles.form} ${loginStyles.form}`}
          onSubmit={handleSubmit}
        >
          <h2>Login</h2>
          {errors && (
            <div className={styles.errorsDiv}>
              <ul>
                {errors.map((error, i) => (
                  <li key={i}>{error}</li>
                ))}
              </ul>
            </div>
          )}
          <div>
            <label htmlFor="email"></label>
            <input
              className={styles.input}
              placeholder="Email"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password"></label>
            <input
              className={styles.input}
              placeholder="Password"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className={`ctaButton submitButton`} type="submit">
            Log In
          </button>
          <div className={styles.switch}>
            <a href="/signup">Don't have an account? Sign up here!</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
