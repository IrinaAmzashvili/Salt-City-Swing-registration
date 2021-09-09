import { csrfFetch } from './csrf';

const SET_LEVELS = 'levels/SET_LEVELS';
const UNLOAD_LEVELS = 'levels/UNLOAD_LEVELS';

const setLevels = (levels) => ({
  type: SET_LEVELS,
  levels
});

export const unloadLevels = () => ({
  type: UNLOAD_LEVELS
});

export const getLevels = () => async (dispatch) => {
  const res = await csrfFetch('/api/levels');

  if (res.ok) {
    const levels = await res.json();
    dispatch(setLevels(levels));
    return res;
  }
}

const initialState = {};

const levelsReducer = (state = initialState, action) => {
  let newObj = {};
  switch (action.type) {
    case SET_LEVELS:
      action.levels.forEach(level => {
        newObj[level.id] = level;
      });
      return { ...state, ...newObj }
    case UNLOAD_LEVELS:
      return { ...initialState };
    default:
      return state;
  }
}

export default levelsReducer;
