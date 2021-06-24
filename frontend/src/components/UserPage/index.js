import { useParams } from 'react-router-dom';
import UserLikes from './UserLikes';
import UserTickets from './UserTickets';
import styles from './UserPage.module.css';

const UserPage = () => {
    const { userId } = useParams();
    console.log(typeof userId)
    // grab all liked classes and purchased classes
    // separate purchased classes by date(past and upcoming)
    return (
        <div>
            <div>
                <UserLikes userId={userId} />
            </div>
            <div>
                <UserTickets userId={userId} />
            </div>
        </div>
    )
}
 export default UserPage;
