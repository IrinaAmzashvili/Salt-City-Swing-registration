import { csrfFetch } from "./csrf";

const SET_CLASSES = 'classes/SET_CLASSES';
const ADD_ONE_CLASS = 'classes/ADD_ONE_CLASS';
const REMOVE_CLASS = 'classes/REMOVE_CLASS';
const UNLOAD_CLASSES = 'classes/UNLOAD_CLASSES';

const setClasses = (classes) => ({
    type: SET_CLASSES,
    classes
});

const setOneClass = (oneClass) => ({
    type: ADD_ONE_CLASS,
    oneClass
});

const removeClass = (id) => ({
    type: REMOVE_CLASS,
    id
});

export const unloadClasses = () => ({
    type: UNLOAD_CLASSES
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

    if (res.ok) {
        const newClass = await res.json();
        dispatch(setOneClass(newClass.newClass));
        return newClass.newClass;
    }
}

export const editClass = (classId, classInfo) => async (dispatch) => {
    const res = await csrfFetch(`/api/classes/${classId}`, {
        method: 'PUT',
        headers: { "Content-Type": "multipart/form-data" },
        body: classInfo
    });

    if (res.ok) {
        const updatedClass = await res.json();
        dispatch(setOneClass(updatedClass.updatedClass));
        return updatedClass.updatedClass;
    }
};

export const deleteClass = (classId) => async (dispatch) => {
    const res = await csrfFetch(`/api/classes/${classId}`, {
        method: 'DELETE',
    });

    if (res.ok) {
        dispatch(removeClass(classId));
        return res;
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
        case REMOVE_CLASS:
            newObj = { ...state };
            delete newObj[action.id];
            return newObj;
        case UNLOAD_CLASSES:
            return { ...initialState };
        default:
            return state;
    }
};

export default classesReducer;
