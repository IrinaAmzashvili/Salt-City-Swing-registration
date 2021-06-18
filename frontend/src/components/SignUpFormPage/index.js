import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import './SignUpForm.css';

const SignUpFormPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [vaxCardImg, setVaxCardImg] = useState('');
  const [userPhoto, setUserPhoto] = useState('');
  const [errors, setErrors] = useState([])

  if (sessionUser) return <Redirect to='/' />;

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
        firstName,
        lastName,
        email,
        password,
        vaxCardImg,
        userPhoto,
    }

    if (password === confirmPassword) {
        setErrors([]);
        return dispatch(sessionActions.signUpUser(newUser))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  }

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
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <ul>
            {errors.map((error, i) => <li key={i}>{error}</li>)}
          </ul>
        </div>
        <div>
          <label>
            First Name
            <input
              type='text'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Last Name
            <input
              type='text'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Email
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Password
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Confirm Password
            <input
              type='password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Upload Vaccination Card
            <input
              type='text'
              value={vaxCardImg}
              onChange={(e) => setVaxCardImg(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Upload a Profile Photo
            <input
              type='text'
              value={userPhoto}
              onChange={(e) => setUserPhoto(e.target.value)}
            />
          </label>
        </div>
        {/* <div>
          <label>
            <input type='checkbox' />
            Add me to your mailing list
          </label>
        </div> */}
        <button type='submit'>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpFormPage;
