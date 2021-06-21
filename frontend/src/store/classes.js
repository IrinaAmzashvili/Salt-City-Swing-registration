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
    switch (action.type) {
        case SET_CLASSES:
            const allClasses = {};
            action.classes.forEach(obj => {
                allClasses[obj.id] = obj;
            })
            return { ...state, ...allClasses };
        default:
            return state;
    }
};

export default classesReducer;
