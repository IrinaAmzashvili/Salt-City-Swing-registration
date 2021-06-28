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

export const loginDemo = () => async (dispatch) => {
    const response = await csrfFetch('/api/session/loginDemo', {
        method: 'POST'
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(setUser(data.demoUser));
        return response;
    }
}

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

export const validatePassword = (password, id) => async () => {
    const res = await csrfFetch(`/api/users/${id}/confirmPassword`, {
        method: 'PUT',
        body: JSON.stringify({ password })
    });

    if (res.ok) {
        await res.json();
        return res;
    }
}

export const updateUser = (user, id) => async (dispatch) => {
    const res = await csrfFetch(`/api/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(user)
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(setUser(data.updatedUser));
        return res;
    }
}

export const updatePassword = (newPasswordInfo, id) => async (dispatch) => {
    const res = await csrfFetch(`/api/users/${id}/updatePassword`, {
        method: 'PUT',
        body: JSON.stringify(newPasswordInfo)
    });

    if (res.ok) {
        await res.json();
        return res;
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

export const deleteUser = (password, id) => async (dispatch) => {
    const res = await csrfFetch(`/api/users/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({ password })
    });

    if (res.ok) {
        dispatch(removeUser());
        return res;
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
