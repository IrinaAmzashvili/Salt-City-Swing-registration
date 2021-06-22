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

    const classObj = classes.find(obj => obj.id === +classId);
    // console.log('---->',classObj)

    useEffect(() => {
        dispatch(getClasses());
        setCurrentClass(classObj)
    }, [dispatch]);

    return currentClass && (
        <div>
            <h2>{currentClass.title}</h2>
            <div>
                <img src={currentClass.image} />
            </div>
            <div>
                <p>{currentClass.description}</p>
                <p>{`$${currentClass.cost}`}</p>
                <p>{currentClass.date}</p>
            </div>
        </div>
    );
}

export default SingleClassComponent;
