import { csrfFetch } from './csrf';

const SET_LIKES = 'classes/SET_LIKES';
const ADD_LIKE = 'likes/ADD_LIKE';
const REMOVE_LIKE = 'likes/REMOVE_LIKE';

const setLikes = (likes) => ({
    type: SET_LIKES,
    likes
})

const addLike = (like) => ({
    type: ADD_LIKE,
    like,
});

const removeLike = (likeId) => ({
    type: REMOVE_LIKE,
    likeId,
});

export const getLikes = (userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/likes/${userId}`);

    if (res.ok) {
        const likes = await res.json();
        dispatch(setLikes(likes));
        return res;
    }
}

export const createLike = (likeInfo) => async (dispatch) => {
    const res = await csrfFetch('/api/likes', {
        method: 'POST',
        body: JSON.stringify(likeInfo)
    });

    if (res.ok) {
        const like = await res.json();
        dispatch(addLike(like));
        return res;
    }
}

export const deleteLike = (likeId) => async (dispatch) => {
    const res = await csrfFetch(`/api/likes/${likeId}`, {
        method: 'DELETE'
    });

    if (res.ok) {
        await res.json();
        dispatch(removeLike(likeId));
        return res;
    }
}

const initialState = {};

const likesReducer = (state = initialState, action) => {
    let newObj = {};
    switch (action.type) {
        case SET_LIKES:
            action.likes.forEach((likeObj) => {
                newObj[likeObj.id] = likeObj;
            });
            return { ...state, ...newObj };
        case ADD_LIKE:
            return {
                ...state,
                [action.like.id]: action.like,
            };
        case REMOVE_LIKE:
            newObj = { ...state };
            delete newObj[action.likeId];
            return newObj;
        default:
            return state;
    }
}

export default likesReducer;
