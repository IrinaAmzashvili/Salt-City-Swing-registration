import { csrfFetch } from "./csrf";

const SET_CLASSES = 'classes/SET_CLASSES';
const ADD_ONE_CLASS = 'classes/ADD_ONE_CLASS';

const setClasses = (classes) => ({
    type: SET_CLASSES,
    classes
});

const setOneClass = (oneClass) => ({
    type: ADD_ONE_CLASS,
    oneClass
});

export const getClasses = () => async (dispatch) => {
    const res = await csrfFetch('/api/classes');

    if (res.ok) {
        const classes = await res.json();
        dispatch(setClasses(classes));
        return res;
    }
}

export const createClass = (classInfo) => async (dispatch) => {
    const res = await csrfFetch('/api/classes', {
        method: 'POST',
        body: JSON.stringify(classInfo)
    });
    console.log('--> in thunk')

    if (res.ok) {
        const newClass = await res.json();
        dispatch(setOneClass(newClass.newClass));
        console.log('--->', newClass.newClass)
        return newClass.newClass;
    }
}

const initialState = {};

const classesReducer = (state = initialState, action) => {
    let newObj = {};
    switch (action.type) {
        case SET_CLASSES:
            action.classes.forEach(classObj => {
                newObj[classObj.id] = classObj;
            })
            return { ...state, ...newObj };
        case ADD_ONE_CLASS:
            return {
                ...state,
                [action.oneClass.id]: action.oneClass,
            };
        default:
            return state;
    }
};

export default classesReducer;
