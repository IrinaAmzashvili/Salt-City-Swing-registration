import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Class.module.css';

const SingleClassComponent = () => {
    const { classId } = useParams();
    return (
        <h2>hello from single class component</h2>
    );
}

export default SingleClassComponent;
