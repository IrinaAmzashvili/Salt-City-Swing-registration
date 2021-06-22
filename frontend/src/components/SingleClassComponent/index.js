import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getClasses } from "../../store/classes";
import styles from './Class.module.css';

const SingleClassComponent = () => {
    const dispatch = useDispatch();
    const [currentClass, setCurrentClass] = useState({ });
    const { classId } = useParams();
    const classes = useSelector(state => Object.values(state.classes))

    useEffect(() => {
        dispatch(getClasses());
    }, [dispatch]);

    useEffect(() => {
        let classObj = classes.find(obj => obj.id === +classId);
        setCurrentClass(classObj)
    }, [classes, classId])

    return (
        <div>
            <div>
                <img className={styles.classImage} src={currentClass?.image} alt='A couple dancing Lindy Hop'/>
            </div>
            <h2>{currentClass?.title}</h2>
            <div>
                <p>{currentClass?.description}</p>
                <p>{`$${currentClass?.cost}`}</p>
                <p>{currentClass?.date}</p>
            </div>
        </div>
    );
}

export default SingleClassComponent;
