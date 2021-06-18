import { csrfFetch } from './csrf';

const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';

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
        console.log(data)

        dispatch(setUser(data.user ?? null));
        return response;
    }
}

export const signUpUser = (user) => async (dispatch) => {
    const response = await csrfFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(user)
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(setUser(data.user));
        return response;
    }
}

export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
        method: 'DELETE'
    });

    if (response.ok) {
        dispatch(removeUser());
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
//     firstName: 'user',
//     lastName: 'newman',
//     email: 'new@new.io',
//     password: 'Aa1!11',
//     vaxCardImg: 'img.png',
//     userPhoto: '',
// }));
