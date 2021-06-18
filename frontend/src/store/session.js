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

export const restoreUser = () => async (dispatch) => {
    const response = await fetch('/api/session');

    if (response.ok) {
        const data = await response.json();
        dispatch(setUser(data.body));
        return response;
    }
}

export const signUpUser = (user) => async (dispatch) => {
    const { firstName, lastName, email, password, vaxCardImg, userPhoto } = user;
    const response = await csrfFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({
            firstName, lastName, email, password, vaxCardImg, userPhoto
        })
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


// window.store.dispatch(window.sessionActions.signUpUser({
//     firstName: 'NewUser',
//     lastName: 'Userman',
//     email: 'new@user.io',
//     password: 'Aa1!11',
//     vaxCardImg: 'img.png',
//     userPhoto: null
//   }));
