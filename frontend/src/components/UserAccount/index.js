import { useSelector } from 'react-redux';
import styles from './UserAccount.module.css';

const UserAccount = () => {
    const user = useSelector(state => state.session.user);

    if (user) {
        //make query for ALL of the user's info
    }
    return (
        <div>
            <h2>Account</h2>
            {/* <label>
                <input>First Name: {user.firstName} />
            </label>
            <label>
                <input>Last Name: {user.lastName} />
            </label>
            <label>
                <input>Email: {user.email} />
            </label>
            <label>
                <input>Mailing List: {user.mailingList ? 'yes' : 'no'} />
            </label> */}
        </div>
    )
}

export default UserAccount;
