import { csrfFetch } from "./csrf";

const SET_CLASSES = 'classes/SET_CLASSES';

const setClasses = (classes) => ({
    type: SET_CLASSES,
    classes
});

export const getClasses = () => async (dispatch) => {
    const res = await csrfFetch('/api/classes');

    if (res.ok) {
        const classes = await res.json();
        dispatch(setClasses(classes));
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
        default:
            return state;
    }
};

export default classesReducer;
