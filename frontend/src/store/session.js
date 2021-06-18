import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user) => ({
    type: SET_USER,
    user
});

const removeUser = () => ({
    type: REMOVE_USER,
});

export const login = ({ credential, password }) => async (dispatch) => {
    // const { credential, password } = user;

    const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({ credential, password })
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(setUser(data.user));
        return response;
    }
}

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_USER:
            newState = Object.assign({}, state);
            newState.user = action.user;
            return newState;
        case REMOVE_USER:
            newState = Object.assign({}, state);
            newState.user = null;
            return newState;
        default:
            return state;
        }
    }

export default sessionReducer;
